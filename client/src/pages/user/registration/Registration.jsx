import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { BASE_URL } from '../../../constants/BASE_URL';

const Registration = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');

  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    setOpen(true);
    await axios
      .post(`${BASE_URL}/user/register`, { name, email, password })
      .then((res) => {
        console.log(res);
        toast.success('Registration successful');
        navigate('/login');
      })
      .catch((err) => {
        console.log(err);
        toast.error(`Registration failed: ${err.code}`);
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
        <h1 className="header">Registration</h1>
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
          />
        </div>

        <div className="info">
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
          />
        </div>

        <div className="info">
          <label htmlFor="password" className="password">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="info">
          <label htmlFor="confirm" className="confirm">
            Confirm Password
          </label>
          <input
            type="password"
            name="confirm"
            id="confirm"
            placeholder="Confirm your password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <div className="space">
          <Link to={'/user/login'} className="link">
            Already have an account? <span>Login</span>
          </Link>
        </div>
        <div className="submit">
          <button className="submit" onClick={() => handleRegister()}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Registration;
