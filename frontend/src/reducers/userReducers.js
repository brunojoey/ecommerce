import {
  userLoginRequest,
  userLoginSuccess,
  userLoginFail,
  userLogout,
  userRegisterRequest,
  userRegisterSuccess,
  userRegisterFail,
  userDetailsRequest,
  userDetailsSuccess,
  userDetailsFail,
  userUpdateProfileRequest,
  userUpdateProfileSuccess,
  userUpdateProfileFail,
  userUpdateProfileReset
} from "../constants/userConstants";

export const userLoginReducer = (state = { products: [] }, action) => {
  // The action object type needs to be evaluated so Switch statement
  switch (action.type) {
    case userLoginRequest:
      return { loading: true };
    case userLoginSuccess:
      return { loading: false, userInfo: action.payload };
    case userLoginFail:
      return { loading: false, error: action.payload };
    case userLogout:
      return {};
    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, action) => {
  // The action object type needs to be evaluated so Switch statement
  switch (action.type) {
    case userRegisterRequest:
      return { loading: true };
    case userRegisterSuccess:
      return { loading: false, userInfo: action.payload };
    case userRegisterFail:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userDetailsReducer = (state = { user: {}}, action) => {
  // The action object type needs to be evaluated so Switch statement
  switch (action.type) {
    case userDetailsRequest:
      return { ...state, loading: true };
    case userDetailsSuccess:
      return { loading: false, user: action.payload };
    case userDetailsFail:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userUpdateProfileReducer = (state = {}, action) => {
  // The action object type needs to be evaluated so Switch statement
  switch (action.type) {
    case userUpdateProfileRequest:
      return { loading: true };
    case userUpdateProfileSuccess:
      return { loading: false, success: true, userInfo: action.payload };
    case userUpdateProfileFail:
      return { loading: false, error: action.payload };
    case userUpdateProfileReset:
      return {};
    default:
      return state;
  }
};
