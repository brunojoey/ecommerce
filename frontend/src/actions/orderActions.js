import {
  orderCreateSuccess,
  orderCreateRequest,
  orderCreateFail,
  orderDetailsRequest,
  orderDetailsSuccess,
  orderDetailsFail,
} from "../constants/orderConstants";
import axios from "axios";

// create order action
export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: orderCreateRequest,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/orders`, order, config);

    dispatch({
      type: orderCreateSuccess,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: orderCreateFail,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// fetching the order and bringing it down through the state
export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: orderDetailsRequest,
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

    const { data } = await axios.get(`api/orders/${id}`, config);

    dispatch({
      type: orderDetailsSuccess,
      payload: data,
    });
  } catch (error) {
    // const message =
    //   error.response && error.response.data.message
    //     ? error.response.data.message
    //     : error.message;
    // if (message === 'Not authorized, token failed') {
    //   dispatch(logout());
    // }
    dispatch({
      type: orderDetailsFail,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
