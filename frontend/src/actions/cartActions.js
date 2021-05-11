import axios from 'axios';
import { cartAddItem, cartRemoveItem, cartSavePaymentMethod, cartSaveShippingAddress } from '../constants/cartConstants';

export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`);

  dispatch({
    type: cartAddItem,
    payload: {
      // all stuff we want to display in our cart
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty
    }
  });

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: cartRemoveItem,
    payload: id
  });

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({
    type: cartSaveShippingAddress,
    payload: data
  });

  localStorage.setItem('shippingAddress', JSON.stringify(data));
}

export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({
    type: cartSavePaymentMethod,
    paymentMethod: data
  });

  localStorage.setItem('paymentMethod', JSON.stringify(data));
}