import {orderCreateFail, orderCreateRequest, orderCreateSuccess} from '../constants/orderConstants';

export const orderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case orderCreateRequest:
      return {
        loading: true
      }
      case orderCreateSuccess:
        return {
          loading: false,
          success: true,
          order: action.payload
        }
        case orderCreateFail:
          return {
            loading: false,
            error: action.payload
          }
      default: 
        return state
  }
}