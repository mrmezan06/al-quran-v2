import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import {
  hadithIndexReducer,
  hadithBookIndexReducer,
  hadithsByBookAndChapterAndRangeReducer,
  hadithsByBookKeyReducer,
} from './reducers/hadithReducer';
import { quranIndexReducer, getSuraReducer } from './reducers/quranReducer';

const reducer = combineReducers({
  hadithIndex: hadithIndexReducer,
  hadithBookIndex: hadithBookIndexReducer,
  hadithsByBookAndChapterAndRange: hadithsByBookAndChapterAndRangeReducer,
  hadithsByBookKey: hadithsByBookKeyReducer,
  quranIndex: quranIndexReducer,
  sura: getSuraReducer,
});

const initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
