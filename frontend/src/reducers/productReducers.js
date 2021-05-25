import {
  productListRequest,
  productListSuccess,
  productListFail,
  productDetailsRequest,
  productDetailsSuccess,
  productDetailsFail,
  productDeleteRequest,
  productDeleteSuccess,
  productDeleteFail,
  productCreateRequest,
  productCreateSuccess,
  productCreateFail,
  productCreateReset,
  productUpdateRequest,
  productUpdateSuccess,
  productUpdateFail,
  productUpdateReset,
  productCreateReviewRequest,
  productCreateReviewSuccess,
  productCreateReviewFail,
  productCreateReviewReset,
  productTopRequest,
  productTopSuccess,
  productTopFail
} from "../constants/productConstants";

// Will handle the Product List
// Reducers take in two things: iniital state and action
export const productListReducer = (state = { products: [] }, action) => {
  // The action object type needs to be evaluated so Switch statement
  switch (action.type) {
    case productListRequest:
      return { loading: true, products: [] };
    case productListSuccess:
      return { loading: false, products: action.payload.products, pages: action.payload.pages, page: action.payload.page }; // all payloads coming from the productController
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

export const productDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case productDeleteRequest:
      return { loading: true };
    case productDeleteSuccess:
      return { loading: false, success: true };
    case productDeleteFail:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case productCreateRequest:
      return { loading: true };
    case productCreateSuccess:
      return { loading: false, success: true, product: action.payload };
    case productCreateFail:
      return { loading: false, error: action.payload };
    case productCreateReset:
      return {};
    default:
      return state;
  }
};

export const productUpdateReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case productUpdateRequest:
      return { loading: true };
    case productUpdateSuccess:
      return { loading: false, success: true, product: action.payload };
    case productUpdateFail:
      return { loading: false, error: action.payload };
    case productUpdateReset:
      return { product: {} };
    default:
      return state;
  }
};

export const productCreateReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case productCreateReviewRequest:
      return { loading: true };
    case productCreateReviewSuccess:
      return { loading: false, success: true };
    case productCreateReviewFail:
      return { loading: false, error: action.payload };
    case productCreateReviewReset:
      return { };
    default:
      return state;
  }
};

export const productTopRatedReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case productTopRequest:
      return { loading: true, products: [] };
    case productTopSuccess:
      return { loading: false, products: action.payload };
    case productTopFail:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};