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
  userDetailsReset,
  userUpdateProfileRequest,
  userUpdateProfileSuccess,
  userUpdateProfileFail,
  userUpdateProfileReset,
  userListRequest,
  userListSuccess,
  userListFail,
  userListReset,
  userDeleteRequest,
  userDeleteSuccess,
  userDeleteFail,
  userUpdateRequest,
  userUpdateSuccess,
  userUpdateFail,
  userUpdateReset
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
    case userDetailsReset:
      // emptying the state after logout
      return { user: {} }
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

export const userListReducer = (state = { users: []}, action) => {
  // The action object type needs to be evaluated so Switch statement
  switch (action.type) {
    case userListRequest:
      return { loading: true };
    case userListSuccess:
      return { loading: false, users: action.payload };
    case userListFail:
      return { loading: false, error: action.payload };
    case userListReset:
      return { user: []}; // will clear the users when Admin logs out
    default:
      return state;
  }
};

export const userDeleteReducer = (state = {}, action) => {
  // The action object type needs to be evaluated so Switch statement
  switch (action.type) {
    case userDeleteRequest:
      return { loading: true };
    case userDeleteSuccess:
      return { loading: false, success: true };
    case userDeleteFail:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userUpdateReducer = (state = { user: {} }, action) => {
  // The action object type needs to be evaluated so Switch statement
  switch (action.type) {
    case userUpdateRequest:
      return { loading: true };
    case userUpdateSuccess:
      return { loading: false, success: true };
    case userUpdateFail:
      return { loading: false, error: action.payload };
    case userUpdateReset:
      return {
        user: {}
      };
    default:
      return state;
  };
};