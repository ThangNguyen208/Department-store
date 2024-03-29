import Axios from 'axios';
import { CART_EMPTY } from '../constants/cartConstants';
import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_MINE_LIST_REQUEST,
  ORDER_MINE_LIST_SUCCESS,
  ORDER_MINE_LIST_FAIL,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_DELETE_REQUEST,
  ORDER_DELETE_SUCCESS,
  ORDER_DELETE_FAIL,
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_SUCCESS,
  ORDER_DELIVER_FAIL,
  ORDER_SUMMARY_REQUEST,
  ORDER_SUMMARY_SUCCESS,
  ORDER_CONFIRM_SHIP_REQUEST,
  ORDER_CONFIRM_SHIP_SUCCESS,
  ORDER_CONFIRM_SHIP_FAIL,
  ORDER_CONFIRM_TAKED_REQUEST,
  ORDER_CONFIRM_TAKED_SUCCESS,
  ORDER_CONFIRM_TAKED_FAIL
} from "../constants/orderConstants";

export const createOrder = (order) => async (dispatch, getState) => {
  dispatch({ type: ORDER_CREATE_REQUEST, payload: order });
  try {
    const {
      userLogin: { userInfom },
    } = getState();
    const { data } = await Axios.post("/api/orders", order, {
      headers: {
        Authorization: `Bearer ${userInfom.token}`,
      },
    });
    dispatch({ type: ORDER_CREATE_SUCCESS, payload: data.order });
    dispatch({ type: CART_EMPTY });
    localStorage.removeItem("cartItems");
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const detailsOrder = (orderId) => async (dispatch, getState) => {
    dispatch({ type: ORDER_DETAILS_REQUEST, payload: orderId });
    const {
      userLogin: { userInfom },
    } = getState();
    try {
      const { data } = await Axios.get(`/api/orders/${orderId}`, {
        headers: { Authorization: `Bearer ${userInfom.token}` },
      });
      dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: ORDER_DETAILS_FAIL, payload: message });
    }
  };

  export const payOrder = (order, paymentResult) => async (
    dispatch,
    getState
  ) => {
    dispatch({ type: ORDER_PAY_REQUEST, payload: { order, paymentResult } });
    const {
      userLogin: { userInfom },
    } = getState();
    try {
      const { data } = Axios.put(`/api/orders/${order._id}/pay`, paymentResult, {
        headers: { Authorization: `Bearer ${userInfom.token}` },
      });
      dispatch({ type: ORDER_PAY_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: ORDER_PAY_FAIL, payload: message });
    }
  };

  export const listOrder = () => async (dispatch, getState) => {
    dispatch({ type: ORDER_MINE_LIST_REQUEST });
    const {
      userLogin: { userInfom },
    } = getState();
    try {
      const { data } = await Axios.get('/api/orders/listmine', {
        headers: {
          Authorization: `Bearer ${userInfom.token}`,
        },
      });
      dispatch({ type: ORDER_MINE_LIST_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: ORDER_MINE_LIST_FAIL, payload: message });
    }
  };

  export const listOrders = ({ seller = ""}) => async (dispatch, getState) => {
    dispatch({ type: ORDER_LIST_REQUEST });
    const {
      userLogin: { userInfom },
    } = getState();
    try {
      const { data } = await Axios.get(`/api/orders?seller=${seller}`, {
        headers: { Authorization: `Bearer ${userInfom.token}` },
      });
      console.log(data);
      dispatch({ type: ORDER_LIST_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: ORDER_LIST_FAIL, payload: message });
    }
  };

  export const deleteOrder = (orderId) => async (dispatch, getState) => {
    dispatch({ type: ORDER_DELETE_REQUEST, payload: orderId });
    const {
      userLogin: { userInfom },
    } = getState();
    try {
     
      const { data } = Axios.delete(`/api/orders/${orderId}`, {
        headers: { Authorization: `Bearer ${userInfom.token}` },
      });
      dispatch({ type: ORDER_DELETE_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: ORDER_DELETE_FAIL, payload: message });
    }
  };

  export const deliverOrder = (orderId) => async (dispatch, getState) => {
    dispatch({ type: ORDER_DELIVER_REQUEST, payload: orderId });
    const {
      userLogin: { userInfom },
    } = getState();
    try {
      const { data } = Axios.put(
        `/api/orders/${orderId}/deliver`,
        {},
        {
          headers: { Authorization: `Bearer ${userInfom.token}` },
        }
      );
      dispatch({ type: ORDER_DELIVER_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: ORDER_DELIVER_FAIL, payload: message });
    }
  };

  export const summaryOrder = () => async (dispatch, getState) => {
    dispatch({ type: ORDER_SUMMARY_REQUEST });
    const {
      userLogin: { userInfom },
    } = getState();
    try {
      const { data } = await Axios.get('/api/orders/summary', {
        headers: { Authorization: `Bearer ${userInfom.token}` },
      });
      dispatch({ type: ORDER_SUMMARY_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: ORDER_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

  export const confirmShip = (orderId) => async (dispatch, getState) => {
    dispatch({ type: ORDER_CONFIRM_SHIP_REQUEST, payload: orderId });
    const {
      userLogin: { userInfom },
    } = getState();
    try {
      const { data } = await Axios.post(
        `/api/orders/confirm/${orderId}`,
        {},
        {
          headers: { Authorization: `Bearer ${userInfom.token}` },
        }
      );
      dispatch({ type: ORDER_CONFIRM_SHIP_SUCCESS, payload: data });
    } catch (error) {
      console.log(error.response);
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: ORDER_CONFIRM_SHIP_FAIL, payload: message });
    }
  };

  export const confirmOrderTaked = (orderId) => async (dispatch, getState) => {
    dispatch({ type: ORDER_CONFIRM_TAKED_REQUEST, payload: orderId });
    const {
      userLogin: { userInfom },
    } = getState();
    try {
      const { data } = await Axios.post(
        `/api/orders/confirmTake/${orderId}`,
        {},
        {
          headers: { Authorization: `Bearer ${userInfom.token}` },
        }
      );
      dispatch({ type: ORDER_CONFIRM_TAKED_SUCCESS, payload: data });
    } catch (error) {
      console.log(error.response);
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: ORDER_CONFIRM_TAKED_FAIL, payload: message });
    }
  };