import {
  orderCreateFail,
  orderCreateRequest,
  orderCreateSuccess,
  orderDetailsRequest,
  orderDetailsSuccess,
  orderDetailsFail,
  orderPayRequest,
  orderPaySuccess,
  orderPayFail,
  orderPayReset,
  orderListMyRequest,
  orderListMySuccess,
  orderListMyFail,
  orderListMyReset,
  orderListRequest,
  orderListSuccess,
  orderListFail,
  orderDeliverRequest,
  orderDeliverSuccess,
  orderDeliverFail,
  orderDeliverReset
} from "../constants/orderConstants";

// Workflow: routes, constants, reducers, actions, screens, bring actions into screen, get what we want from the state

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

export const orderPayReducer = ( state = {}, action ) => {
  switch (action.type) {
    case orderPayRequest:
      return {
        loading: true,
      };
    case orderPaySuccess:
      return {
        loading: false,
        success: true,
      };
    case orderPayFail:
      return {
        loading: false,
        error: action.payload,
      };
    case orderPayReset:
      return {}
    default:
      return state;
  }
};

export const orderDeliverReducer = ( state = {}, action ) => {
  switch (action.type) {
    case orderDeliverRequest:
      return {
        loading: true,
      };
    case orderDeliverSuccess:
      return {
        loading: false,
        success: true,
      };
    case orderDeliverFail:
      return {
        loading: false,
        error: action.payload,
      };
    case orderDeliverReset:
      return {}
    default:
      return state;
  }
};

export const orderListMyReducer = ( state = {orders: []}, action ) => {
  switch (action.type) {
    case orderListMyRequest:
      return {
        loading: true,
      };
    case orderListMySuccess:
      return {
        loading: false,
        orders: action.payload,
      };
    case orderListMyFail:
      return {
        loading: false,
        error: action.payload,
      };
    case orderListMyReset:
      return {
        // emptying the state
        orders: []
      };
    default:
      return state;
  }
};

export const orderListReducer = ( state = {orders: []}, action ) => {
  switch (action.type) {
    case orderListRequest:
      return {
        loading: true,
      };
    case orderListSuccess:
      return {
        loading: false,
        orders: action.payload,
      };
    case orderListFail:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
