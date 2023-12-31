import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import toast, { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import './profile.css';
import { useSelector } from 'react-redux';

const Profile = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profileImg, setprofileImg] = useState('');
  const [name, setName] = useState('');

  const user = useSelector((state) => state.userinfo.user);

  const navigate = useNavigate();
  const userId = localStorage.getItem('userID');
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdate = async () => {
    toast.success('Functionality not yet available', {
      position: 'top-right',
      duration: 2000,
    });
  };

  useEffect(() => {
    if (user) {
      setName(user?.name);
      setEmail(user?.email);
      setPassword(user?.password);
    } else {
      navigate('/user/login');
    }
    // eslint-disable-next-line
  }, [userId]);

  return (
    <div className="main-user">
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <h1>Update Profile</h1>
      <Toaster />
      <div className="profileImgContainer">
        <img
          src={
            profileImg === ''
              ? 'https://images.unsplash.com/photo-1494537176433-7a3c4ef2046f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80'
              : profileImg
          }
          alt="profile"
          className="profileImg"
        />
      </div>
      <div className="form mt-2">
        <div className="info">
          <label htmlFor="name" className="name">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Your Full Name"
            onChange={(e) => setName(e.target.value)}
            required
            value={name}
          />
        </div>

        <div className="info mt-1">
          <label htmlFor="email" className="email">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email address"
            onChange={(e) => setEmail(e.target.value)}
            required
            value={email}
            disabled
          />
        </div>

        <div className="info mt-1">
          <label htmlFor="password" className="password">
            Change Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter your new password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div className="info mt-1">
          <label htmlFor="profileImg" className="profileImgUrl">
            Profile Image
          </label>
          <input
            type="text"
            name="profileImg"
            id="profileImg"
            placeholder="Profile Image Url"
            onChange={(e) => setprofileImg(e.target.value)}
            value={profileImg}
            disabled
          />
        </div>
        <div className="book-submit">
          <button className="submit" onClick={() => handleUpdate()}>
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
