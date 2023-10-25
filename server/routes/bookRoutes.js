const express = require('express');

const {
  upload,
  updateBook,
  getBookByTitle,
  getBooks,
  getBookById,
  getBooksByCategory,
  getBooksByAuthor,
  getBooksByUploader,
} = require('../controller/bookController');

const router = express.Router();

router.get('/get', getBooks);
router.get('/get/:id', getBookById);
router.get('/uploader/:uid', getBooksByUploader);
router.get('/category/:category', getBooksByCategory);
router.post('/title', getBookByTitle);
router.post('/author', getBooksByAuthor);
router.post('/upload/:uid', upload);
router.put('/update/:uid/:bid', updateBook);

module.exports = router;
