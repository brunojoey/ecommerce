import axios from "axios";
import {
  productListRequest,
  productListSuccess,
  productListFail,
  productDetailsRequest,
  productDetailsSuccess,
  productDetailsFail,
  productDeleteRequest,
  productDeleteSuccess,
  productDeleteFail,
  productCreateRequest,
  productCreateSuccess,
  productCreateFail,
  productUpdateRequest,
  productUpdateSuccess,
  productUpdateFail,
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

export const deleteProduct = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: productDeleteRequest,
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

    await axios.delete(`/api/products/${id}`, config);

    dispatch({ type: productDeleteSuccess });
  } catch (error) {
    // const message =
    //   error.response && error.response.data.message
    //     ? error.response.data.message
    //     : error.message;
    // if (message === 'Not authorized, token failed') {
    //   dispatch(logout());
    // }
    dispatch({
      type: productDeleteFail,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
}

export const createProduct = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: productCreateRequest,
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

    const { data } = await axios.post(`/api/products`, {}, config);

    dispatch({ type: productCreateSuccess, payload: data });
  } catch (error) {
    // const message =
    //   error.response && error.response.data.message
    //     ? error.response.data.message
    //     : error.message;
    // if (message === 'Not authorized, token failed') {
    //   dispatch(logout());
    // }
    dispatch({
      type: productCreateFail,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
}

export const updateProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch({
      type: productUpdateRequest,
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

    const { data } = await axios.put(`/api/products/${product._id}`, product, config);

    dispatch({ type: productUpdateSuccess, payload: data });
  } catch (error) {
    // const message =
    //   error.response && error.response.data.message
    //     ? error.response.data.message
    //     : error.message;
    // if (message === 'Not authorized, token failed') {
    //   dispatch(logout());
    // }
    dispatch({
      type: productUpdateFail,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
}