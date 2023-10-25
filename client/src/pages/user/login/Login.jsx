import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import './login.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, tokenLogin } from '../../../actions/userActions';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userinfo.user);

  const handleLogin = async () => {
    toast.loading('Loading...', { duration: 2000, position: 'top-right' });
    setOpen(true);
    dispatch(login(email, password));
    setOpen(false);
    toast.dismiss();
  };

  useEffect(() => {
    dispatch(tokenLogin());
  }, [dispatch]);

  useEffect(() => {
    if (user && (user.role === 'admin' || user.role === 'uploader')) {
      navigate('/user/dashboard', { replace: true });
    }
    if (user && user.role === 'user') {
      navigate('/', { replace: true });
    }
  });

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
