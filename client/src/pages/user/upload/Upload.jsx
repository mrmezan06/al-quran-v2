import React, { useState } from 'react';
import './upload.css';

import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import { useSelector } from 'react-redux';
import { BASE_URL } from '../../../constants/BASE_URL';

const Upload = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [part, setPart] = useState(1);
  const [category, setCategory] = useState();
  const [url, setUrl] = useState([]);
  const [open, setOpen] = useState(false);

  const user = useSelector((state) => state.userinfo.user);

  const handleClose = () => {
    setOpen(false);
  };
  const handleUpload = async (e) => {
    if (!title || !author || !part || !category || !url) {
      toast.error('Please fill-up all the fields');
      return;
    }

    setOpen(true);
    await axios
      .post(`${BASE_URL}/book/upload/${user?._id}`, {
        title,
        author,
        part,
        category,
        url,
      })
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          toast.success('Book uploaded successfully');
          setTitle('');
          setAuthor('');
          setPart(1);
          setCategory('');
          setUrl([]);
        } else {
          toast.error(`Book upload failed with status code: ${res.status}`);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
    setOpen(false);
  };
  return (
    <div className="main-user">
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Toaster />
      <div className="form">
        <h1>Upload Books</h1>
        <div className="info">
          <label htmlFor="name" className="name">
            Book name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Title of the book"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required
          />
        </div>

        <div className="info">
          <label htmlFor="author" className="author">
            Author
          </label>
          <input
            type="text"
            name="author"
            id="author"
            value={author}
            placeholder="Author of the book"
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>
        <div className="info">
          <label htmlFor="description" className="description">
            Part
          </label>
          <input
            name="part"
            id="part"
            value={part}
            type="number"
            placeholder="Number of Part"
            onChange={(e) => setPart(e.target.value)}
            required
          ></input>
        </div>
        <div className="info">
          <label htmlFor="category" className="category">
            Category
          </label>
          <input
            type="text"
            name="category"
            id="category"
            placeholder="Category of the book. Ex: Quran, Hadith etc."
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
            }}
            required
          />
        </div>

        <div className="info">
          <label htmlFor="book">Book URL</label>
          <input
            type="text"
            name="book"
            id="book"
            value={url.toString()}
            placeholder="Book URL of the book"
            onChange={(e) => {
              const urlArray = e.target.value.split(',');
              setUrl(urlArray);
            }}
            required
          />
        </div>
        <div className="submit">
          <button className="submit" onClick={() => handleUpload()}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Upload;
