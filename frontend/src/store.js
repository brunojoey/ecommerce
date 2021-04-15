import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { productListReducer, productDetailsReducer } from './reducers/productReducers.js';

const reducer = combineReducers({
  // productList will show as the state. Not productListReducer and so on!
  productList: productListReducer,
  productDetails: productDetailsReducer,
});

const initialState = {};

// spread whatever is in thunk and will pass it in the applyMiddleware spread operator
const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
