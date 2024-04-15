import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import initialState from "./initial.state";
import adsReducer from "./ads.redux";
import usersReducer from "./user.redux";

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
