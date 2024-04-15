import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import initialState from "./initialState";
import adsReducer from "./adsRedux";
import usersReducer from "./userRedux";

const subreducers = {
  ads: adsReducer,
  users: usersReducer,
};

const reducer = combineReducers(subreducers);

const store = createStore(
  reducer,
  initialState,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
