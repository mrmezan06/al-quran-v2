const mongoose = require('mongoose');
const { findById } = require('../models/audioFull');
const Book = require('../models/book');
const User = require('../models/user');

const upload = async (req, res) => {
  const { title, part, category, url, author } = req.body;

  if (!title || !part || !category || !author) {
    return res.status(400).json({ message: 'Please fill all fields!' });
  }



  if (url.length !== Number(part)) {
    return res
      .status(400)
      .json({ message: 'Please add all the url of part seperated by comma' });
  }

  const book = await Book.findOne({ title });

  if (book) {
    return res.status(400).json({ message: 'Book already exists!' });
  }

  const user = await User.findById(req.params.uid);

  if (!user) {
    return res.status(404).json({ message: 'User not found!' });
  }

  if (user.role !== 'admin' && user.role !== 'uploader') {
    return res
      .status(401)
      .json({ message: 'You are not authorized to upload book!' });
  }

  try {
    const newBook = new Book({
      title,
      part,
      category,
      url,
      author,
      uploader: req.params.uid,
      updater: req.params.uid,
    });

    await newBook.save();

    res.status(201).json({ message: 'Book uploaded successfully!' });
  } catch (error) {
    res.status(502).json({
      error,
    });
  }
};

const getBooks = async (req, res) => {
  try {
    const books = await Book.find({}).sort('title');
    if (books.length > 0) {
      res.status(200).json(books);
    } else {
      res.status(200).json([]);
    }
  } catch (error) {
    res.status(502).json({
      error,
    });
  }
};

const getBooksByCategory = async (req, res) => {
  try {
    const books = await Book.find({ category: req.params.category }).sort(
      'title'
    );
    if (books.length > 0) {
      res.status(200).json(books);
    } else {
      res.status(200).json([]);
    }
  } catch (error) {
    res.status(502).json({
      error,
    });
  }
};

const getBooksByAuthor = async (req, res) => {
  try {
    const books = await Book.find({ author: req.body.author }).sort('title');
    if (books.length > 0) {
      res.status(200).json(books);
    } else {
      res.status(200).json({ message: 'No data found!' });
    }
  } catch (error) {
    res.status(502).json({
      error,
    });
  }
};

const getBooksByUploader = async (req, res) => {
  try {
    const books = await Book.find({ uploader: req.params.uid }).sort('title');
    if (books.length > 0) {
      res.status(200).json(books);
    } else {
      res.status(200).json({ message: 'No data found!' });
    }
  } catch (error) {
    res.status(502).json({
      error,
    });
  }
};

const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (book) {
      res.status(200).json(book);
    } else {
      res.status(200).json({ message: 'No data found!' });
    }
  } catch (error) {
    res.status(502).json({
      error,
    });
  }
};

const getBookByTitle = async (req, res) => {
  try {
    // title case insensitive
    const book = await Book.find({
      title: { $regex: new RegExp(req.body.title, 'i') },
    });
    if (book) {
      res.status(200).json(book);
    } else {
      res.status(200).json({ message: 'No data found!' });
    }
  } catch (error) {
    res.status(502).json({
      error,
    });
  }
};

const updateBook = async (req, res) => {
  const { title, part, category, url, author } = req.body;

  if (!title || !part || !category || !author) {
    return res.status(400).json({ message: 'Please fill all fields!' });
  }

  if (url.length !== part) {
    return res
      .status(400)
      .json({ message: 'Please add all the url of part seperated by comma' });
  }

  const user = await User.findById(req.params.uid);

  if (!user) {
    return res.status(404).json({ message: 'User not found!' });
  }

  if (user.role !== 'admin' && user.role !== 'uploader') {
    return res
      .status(401)
      .json({ message: 'You are not authorized to update book!' });
  }

  try {
    const book = await Book.findById(req.params.bid);

    if (!book) {
      return res.status(404).json({ message: 'Book not found!' });
    }

    if (book.uploader !== req.params.uid && user.role !== 'admin') {
      return res
        .status(401)
        .json({ message: 'You are not authorized to update book!' });
    }

    const existedBook = await Book.findOne({ title });

    if (
      title === existedBook?.title &&
      existedBook?._id.toString() !== req.params.bid
    ) {
      return res
        .status(400)
        .json({ message: 'Book already exists! Choose another name' });
    }

    const updatedBook = await Book.findByIdAndUpdate(
      req.params.bid,
      {
        title,
        part,
        category,
        url,
        author,
        updater: user?._id,
        updatedAt: Date.now(),
      },
      {
        new: true,
      }
    );

    res.status(200).json({ message: 'Book updated successfully!' });
  } catch (error) {
    res.status(502).json(error);
  }
};

module.exports = {
  upload,
  getBooks,
  getBooksByCategory,
  getBooksByAuthor, // for search and send data in body
  getBooksByUploader,
  getBookById,
  getBookByTitle, // for search and send data in body
  updateBook,
};
