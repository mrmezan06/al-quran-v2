import axios from 'axios';
import { BASE_URL } from '../constants/BASE_URL';

export const getBooks = () => async (dispatch) => {
  try {
    dispatch({ type: 'BOOK_INDEX_REQUEST' });

    const { data } = await axios.get(`${BASE_URL}/book/get`);
    // console.log(data);

    dispatch({ type: 'BOOK_INDEX_SUCCESS', payload: data });
  } catch (error) {
    dispatch({
      type: 'BOOK_INDEX_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const getBooksByCategory = (category) => async (dispatch) => {
  try {
    dispatch({ type: 'CATEGORY_INDEX_REQUEST' });

    const { data } = await axios.get(`${BASE_URL}/book/category/${category}`);
    // console.log(data);

    dispatch({ type: 'CATEGORY_INDEX_SUCCESS', payload: data });
  } catch (error) {
    dispatch({
      type: 'CATEGORY_INDEX_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
