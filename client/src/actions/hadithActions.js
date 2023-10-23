import axios from 'axios';
import { BASE_URL } from '../constants/BASE_URL';
import {
  HADITH_BOOK_INDEX_BY_CHAPTER_AND_RANGE_FAIL,
  HADITH_BOOK_INDEX_BY_CHAPTER_AND_RANGE_REQUEST,
  HADITH_BOOK_INDEX_BY_CHAPTER_AND_RANGE_SUCCESS,
  HADITH_BOOK_INDEX_FAIL,
  HADITH_BOOK_INDEX_REQUEST,
  HADITH_BOOK_INDEX_SUCCESS,
  HADITH_BY_BOOK_KEY_FAIL,
  HADITH_BY_BOOK_KEY_REQUEST,
  HADITH_BY_BOOK_KEY_SUCCESS,
  HADITH_INDEX_FAIL,
  HADITH_INDEX_REQUEST,
  HADITH_INDEX_SUCCESS,
} from '../constants/Hadith_Constants';

export const getHadithIndex = () => async (dispatch) => {
  try {
    dispatch({ type: HADITH_INDEX_REQUEST });

    const { data } = await axios.get(`${BASE_URL}/api/hadith/index`);
    // console.log(data);

    dispatch({ type: HADITH_INDEX_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: HADITH_INDEX_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getHadithBookIndex =
  (book_key, pageNumber = '') =>
  async (dispatch) => {
    try {
      dispatch({ type: HADITH_BOOK_INDEX_REQUEST });

      const { data } = await axios.get(
        `${BASE_URL}/api/hadith/index/${book_key}?pageNumber=${pageNumber}`
      );
      // console.log(data);

      dispatch({ type: HADITH_BOOK_INDEX_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: HADITH_BOOK_INDEX_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getHadithsByBookAndChapterAndRange =
  (book_key, chapter, start, range) => async (dispatch) => {
    try {
      dispatch({ type: HADITH_BOOK_INDEX_BY_CHAPTER_AND_RANGE_REQUEST });

      const { data } = await axios.get(
        `${BASE_URL}/api/hadith/get/${book_key}/${chapter}/${start}/${range}`
      );
      console.log(data);

      dispatch({
        type: HADITH_BOOK_INDEX_BY_CHAPTER_AND_RANGE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: HADITH_BOOK_INDEX_BY_CHAPTER_AND_RANGE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
export const getHadithsByBookKey =
  (book_key, pageNumber = '') =>
  async (dispatch) => {
    try {
      dispatch({ type: HADITH_BY_BOOK_KEY_REQUEST });

      const { data } = await axios.get(
        `${BASE_URL}/api/hadith/book/${book_key}?pageNumber=${pageNumber}`
      );
      console.log(data);

      dispatch({
        type: HADITH_BY_BOOK_KEY_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: HADITH_BY_BOOK_KEY_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
