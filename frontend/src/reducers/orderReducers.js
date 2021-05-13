import {
  orderCreateFail,
  orderCreateRequest,
  orderCreateSuccess,
  orderDetailsRequest,
  orderDetailsSuccess,
  orderDetailsFail,
} from "../constants/orderConstants";

export const orderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case orderCreateRequest:
      return {
        loading: true,
      };
    case orderCreateSuccess:
      return {
        loading: false,
        success: true,
        order: action.payload,
      };
    case orderCreateFail:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const orderDetailsReducer = (
  state = { loading: true, orderItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case orderDetailsRequest:
      return {
        ...state,
        loading: true,
      };
    case orderDetailsSuccess:
      return {
        loading: false,
        order: action.payload,
      };
    case orderDetailsFail:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
