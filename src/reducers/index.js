import { createStore, compose, combineReducers, applyMiddleware } from "redux"
import logger from "redux-logger"
import thunk from "redux-thunk"

// IMPORT SECTION FOR ANY REDUCERS
import { personsReducer } from "./personsReducer"


const rootReducer = combineReducers({
  persons: personsReducer
})

let store;
let middleware

if (window.__REDUX_DEVTOOLS_EXTENSION__) {
  middleware = [thunk, logger];
  // middleware = [thunk];
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const enhancer = composeEnhancers(applyMiddleware(...middleware));
  store = createStore(
    rootReducer,
    {
      //any preloaded state here
    },
    enhancer
  );
} else {
  store = createStore(
    rootReducer,
    {
      // any preloaded state here
    },
    applyMiddleware(thunk, logger)
  );
};

export { store }

