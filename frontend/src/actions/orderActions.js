import {orderCreateSuccess, orderCreateRequest, orderCreateFail} from '../constants/orderConstants';
import axios from 'axios';

// create order action
export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: orderCreateRequest,
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

    const { data } = await axios.post(`api/orders`, order, config);

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
  };
};

