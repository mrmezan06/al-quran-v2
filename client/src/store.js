import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { quranIndexReducer, getSuraReducer } from './reducers/quranReducer';
import { tokenLoginReducer } from './reducers/userReducer';
import {
  getBooksByCategoryReducer,
  getBooksReducer,
} from './reducers/bookReducer';

const reducer = combineReducers({
  quranIndex: quranIndexReducer,
  sura: getSuraReducer,
  userinfo: tokenLoginReducer,
  bookIndex: getBooksReducer,
  categoryIndex: getBooksByCategoryReducer,
});

const initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
