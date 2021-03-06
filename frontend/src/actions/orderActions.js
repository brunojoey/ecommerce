import {
  orderCreateRequest,
  orderCreateSuccess,
  orderCreateFail,
  orderDetailsRequest,
  orderDetailsSuccess,
  orderDetailsFail,
  orderPayRequest,
  orderPaySuccess,
  orderPayFail,
  orderListMyRequest,
  orderListMySuccess,
  orderListMyFail,
  orderListRequest,
  orderListSuccess,
  orderListFail,
  orderDeliverRequest,
  orderDeliverSuccess,
  orderDeliverFail,
  orderCancelRequest,
  orderCancelSuccess,
  orderCancelFail
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

    const { data } = await axios.get(`/api/orders/${id}`, config);

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

export const payOrder = (orderId, paymentResult) => async (dispatch, getState) => {
  try {
    dispatch({
      type: orderPayRequest,
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

    const { data } = await axios.put(`/api/orders/${orderId}/pay`, paymentResult, config);

    dispatch({
      type: orderPaySuccess,
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
      type: orderPayFail,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
}

export const deliverOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: orderDeliverRequest,
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

    const { data } = await axios.put(`/api/orders/${order._id}/deliver`, {}, config);

    dispatch({
      type: orderDeliverSuccess,
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
      type: orderDeliverFail,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
}

export const listMyOrders = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: orderListMyRequest,
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

    const { data } = await axios.get(`/api/orders/my-orders`, config);

    dispatch({
      type: orderListMySuccess,
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
      type: orderListMyFail,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listOrders = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: orderListRequest,
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

    const { data } = await axios.get(`/api/orders`, config);

    dispatch({
      type: orderListSuccess,
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
      type: orderListFail,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const cancelOrder = (orderId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: orderCancelRequest,
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

    const { data } = await axios.delete(`/api/orders/${orderId}`, config);

    dispatch({
      type: orderCancelSuccess,
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
      type: orderCancelFail,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};