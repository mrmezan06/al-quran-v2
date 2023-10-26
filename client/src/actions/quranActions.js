import axios from 'axios';

import { BASE_URL } from '../constants/BASE_URL';
import {
  QURAN_AYAT_FAIL,
  QURAN_AYAT_REQUEST,
  QURAN_AYAT_SUCCESS,
  QURAN_INDEX_FAIL,
  QURAN_INDEX_REQUEST,
  QURAN_INDEX_SUCCESS,
} from '../constants/Quran_Constants';

export const getQuranIndex = () => async (dispatch) => {
  try {
    dispatch({ type: QURAN_INDEX_REQUEST });

    const { data } = await axios.get(`${BASE_URL}/index`);
    // console.log(data);

    dispatch({ type: QURAN_INDEX_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: QURAN_INDEX_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getSuraById = (suraNumber, page) => async (dispatch) => {
  try {
    dispatch({ type: QURAN_AYAT_REQUEST });

    const { data } = await axios.get(
      `${BASE_URL}/sura/get/${suraNumber}/${page}`
    );

    // console.log(data);

    dispatch({ type: QURAN_AYAT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: QURAN_AYAT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
