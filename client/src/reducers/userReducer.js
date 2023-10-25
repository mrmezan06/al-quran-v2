export const tokenLoginReducer = (state = { user: [] }, action) => {
  switch (action.type) {
    case 'USER_LOGIN_REQUEST':
      return { loading: true, user: [] };
    case 'USER_LOGIN_SUCCESS':
      return {
        loading: false,
        user: action.payload,
      };
    case 'USER_LOGIN_FAIL':
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
