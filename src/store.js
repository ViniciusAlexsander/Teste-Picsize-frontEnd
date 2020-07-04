import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { combineReducers } from "redux";
import loanReducer from "./pages/Store";

const reducers = combineReducers({
  loan: loanReducer,
});

const composeEnhancers =
  (window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_) ||
  compose;

const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

export default store;