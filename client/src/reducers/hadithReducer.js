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

export const hadithIndexReducer = (state = [], action) => {
  switch (action.type) {
    case HADITH_INDEX_REQUEST:
      return { loading: true };
    case HADITH_INDEX_SUCCESS:
      return { loading: false, index: action.payload };
    case HADITH_INDEX_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const hadithBookIndexReducer = (state = { index: [] }, action) => {
  switch (action.type) {
    case HADITH_BOOK_INDEX_REQUEST:
      return { loading: true, index: [] };
    case HADITH_BOOK_INDEX_SUCCESS:
      return {
        loading: false,
        index: action.payload.index,
        page: action.payload.page,
        pages: action.payload.pages,
        details: action.payload.details,
      };
    case HADITH_BOOK_INDEX_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const hadithsByBookAndChapterAndRangeReducer = (
  state = { hadiths: [] },
  action
) => {
  switch (action.type) {
    case HADITH_BOOK_INDEX_BY_CHAPTER_AND_RANGE_REQUEST:
      return { loading: true, hadiths: [] };
    case HADITH_BOOK_INDEX_BY_CHAPTER_AND_RANGE_SUCCESS:
      return {
        loading: false,
        hadiths: action.payload.filtered,
        details: action.payload.details,
      };
    case HADITH_BOOK_INDEX_BY_CHAPTER_AND_RANGE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const hadithsByBookKeyReducer = (state = { hadiths: [] }, action) => {
  switch (action.type) {
    case HADITH_BY_BOOK_KEY_REQUEST:
      return { loading: true, hadiths: [] };
    case HADITH_BY_BOOK_KEY_SUCCESS:
      return {
        loading: false,
        hadiths: action.payload.hadiths,
        page: action.payload.page,
        pages: action.payload.pages,
        details: action.payload.details,
      };
    case HADITH_BY_BOOK_KEY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
