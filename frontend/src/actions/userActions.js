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
} from "../constants/userConstants";
import { orderListMyReset } from '../constants/orderConstants';
import axios from "axios";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: userLoginRequest,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/users/login",
      { email, password },
      config
    );

    dispatch({
      type: userLoginSuccess,
      payload: data,
    });

    // will come from the userController in the authUser function when a password matches.
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: userLoginFail,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: userLogout });
  // state should be reset to not see User Orders from last logged in
  dispatch({ type: userDetailsReset });
  dispatch({ type: orderListMyReset });
  dispatch({ type: userListReset });
};

export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({
      type: userRegisterRequest,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/users",
      { name, email, password },
      config
    );

    dispatch({
      type: userRegisterSuccess,
      payload: data,
    });

    // to immediately login after registering
    dispatch({
      type: userLoginSuccess,
      payload: data,
    });

    // will come from the userController in the authUser function when a password matches.
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: userRegisterFail,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: userDetailsRequest,
    });

    // should give us access to the logged in user object
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/users/${id}`, config);

    dispatch({
      type: userDetailsSuccess,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: userDetailsFail,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  };
};

export const updateUserProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: userUpdateProfileRequest,
    });

    // should give us access to the logged in user object
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`/api/users/profile`, user, config);

    dispatch({
      type: userUpdateProfileSuccess,
      payload: data,
    });

    // These will be used to update the name in the navbar
    dispatch({
      type: userLoginSuccess,
      payload: data,
    });
    localStorage.setItem("userInfo", JSON.stringify(data));

  } catch (error) {
    dispatch({
      type: userUpdateProfileFail,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  };
};

export const listUsers = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: userListRequest,
    });

    // should give us access to the logged in user object
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/users`, config);

    dispatch({
      type: userListSuccess,
      payload: data,
    });

  } catch (error) {
    dispatch({
      type: userListFail,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  };
};

export const deleteUser = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: userDeleteRequest,
    });

    // should give us access to the logged in user object
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/users/${id}`, config);

    dispatch({ type: userDeleteSuccess });
  } catch (error) {
    dispatch({
      type: userDeleteFail,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  };
};

export const updateUser = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: userUpdateRequest,
    });

    // should give us access to the logged in user object
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`/api/users/${user._id}`, user, config);

    dispatch({ type: userUpdateSuccess });
    dispatch({ type: userDetailsSuccess, payload: data });
  } catch (error) {
    dispatch({
      type: userUpdateFail,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  };
};