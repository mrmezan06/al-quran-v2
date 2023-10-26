import axios from 'axios';

import { BASE_URL } from '../constants/BASE_URL';

export const tokenLogin = () => async (dispatch) => {
  try {
    dispatch({ type: 'USER_LOGIN_REQUEST' });
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(
      `${BASE_URL}/user/token/login`,
      {
        accesstoken: token,
      },
      config
    );
    //console.log(data);
    dispatch({ type: 'USER_LOGIN_SUCCESS', payload: data });
  } catch (error) {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    dispatch({
      type: 'USER_LOGIN_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const login = (email, password) => async (dispatch) => {
  dispatch({ type: 'USER_LOGIN_REQUEST' });
  await axios
    .post(`${BASE_URL}/user/login`, { email, password })
    .then((res) => {
      // split data into two parts and store them in local storage
      // take the accessToken and store it in local storage
      // take rest of the data and store it in local storage
      const { accessToken, ...rest } = res.data;
      localStorage.setItem('token', accessToken);
      localStorage.setItem('user', JSON.stringify(rest));

      dispatch({ type: 'USER_LOGIN_SUCCESS', payload: res.data });
    })
    .catch((err) => {
      dispatch({
        type: 'USER_LOGIN_FAIL',
        payload: err,
      });
    });
};
