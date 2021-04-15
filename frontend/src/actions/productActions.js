import axios from "axios";
import {
  productListRequest,
  productListSuccess,
  productListFail,
  productDetailsRequest,
  productDetailsSuccess,
  productDetailsFail
} from "../constants/productConstants";

// action creators. actions will be dispatched elsewhere
export const listProducts = () => async (dispatch) => {
  try {
    dispatch({ type: productListRequest }); // Will enable the productListRequest action in productReducers
    const { data } = await axios.get("/api/products");

    dispatch({ type: productListSuccess, payload: data });
  } catch (error) {
    dispatch({
      type: productListFail,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: productDetailsRequest }); // Will enable the productDetailsRequest action in productReducers
    const { data } = await axios.get(`/api/products/${id}`);

    dispatch({ type: productDetailsSuccess, payload: data });
  } catch (error) {
    dispatch({
      type: productDetailsFail,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
