import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import './login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogin = async () => {
    setOpen(true);
    await axios
      .post('/auth/login', { email, password })
      .then((res) => {
        localStorage.setItem('userID', res.data._id);
        localStorage.setItem('token', res.data.token);
        // console.log(res.data._id);
        if (res.status === 200) {
          navigate(`/dashboard/${res.data._id}`);
        } else {
          toast.error(`Login failed: ${res.code}`);
        }
      })
      .catch((err) => {
        toast.error(err.message);
      });
    setOpen(false);
  };
  return (
    <div className="main">
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Toaster />
      <div className="form">
        <h1 className="header">Login</h1>
        <div className="info">
          <label htmlFor="email" className="email">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="i.e. john@examle.com"
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
            placeholder="i.e., ********"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="space">
          <Link to={'/user/register'} className="link">
            Don't have an account? <span>Register</span>
          </Link>
        </div>

        <div className="submit">
          <button className="submit" onClick={() => handleLogin()}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
