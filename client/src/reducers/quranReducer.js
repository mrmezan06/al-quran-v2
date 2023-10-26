import {
  QURAN_AYAT_FAIL,
  QURAN_AYAT_REQUEST,
  QURAN_AYAT_SUCCESS,
  QURAN_INDEX_FAIL,
  QURAN_INDEX_REQUEST,
  QURAN_INDEX_SUCCESS,
} from '../constants/Quran_Constants';

export const quranIndexReducer = (state = { index: [] }, action) => {
  switch (action.type) {
    case QURAN_INDEX_REQUEST:
      return { loading: true, index: [] };
    case QURAN_INDEX_SUCCESS:
      return {
        loading: false,
        index: action.payload,
      };
    case QURAN_INDEX_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getSuraReducer = (state = { sura: {} }, action) => {
  switch (action.type) {
    case QURAN_AYAT_REQUEST:
      return { loading: true, sura: {} };
    case QURAN_AYAT_SUCCESS:
      return {
        loading: false,
        verses: action.payload.verses,
        page: action.payload.page,
        pageSize: action.payload.pageSize,
        totalPage: action.payload.totalPage,
        fullAudio: action.payload.fullAudio,
        details: action.payload.details,
      };
    case QURAN_AYAT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
