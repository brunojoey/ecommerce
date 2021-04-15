import {
  productListRequest,
  productListSuccess,
  productListFail,
  productDetailsRequest,
  productDetailsSuccess,
  productDetailsFail,
} from "../constants/productConstants";

// Will handle the Product List
// Reducers take in two things: iniital state and action
export const productListReducer = (state = { products: [] }, action) => {
  // The action object type needs to be evaluated so Switch statement
  switch (action.type) {
    case productListRequest:
      return { loading: true, products: [] };
    case productListSuccess:
      return { loading: false, products: action.payload };
    case productListFail:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// Will handle the Product Detail page
export const productDetailsReducer = (
  state = { product: { reviews: [] } },
  action
) => {
  // The action object type needs to be evaluated so Switch statement
  switch (action.type) {
    case productDetailsRequest:
      return { loading: true, ...state };
    case productDetailsSuccess:
      return { loading: false, product: action.payload };
    case productDetailsFail:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
