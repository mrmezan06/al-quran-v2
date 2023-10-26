export const getBooksReducer = (state = { index: [] }, action) => {
  switch (action.type) {
    case 'BOOK_INDEX_REQUEST':
      return { loading: true };
    case 'BOOK_INDEX_SUCCESS':
      return { loading: false, index: action.payload };
    case 'BOOK_INDEX_FAIL':
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const getBooksByCategoryReducer = (state = { index: [] }, action) => {
  switch (action.type) {
    case 'CATEGORY_INDEX_REQUEST':
      return { loading: true };
    case 'CATEGORY_INDEX_SUCCESS':
      return { loading: false, index: action.payload };
    case 'CATEGORY_INDEX_FAIL':
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
