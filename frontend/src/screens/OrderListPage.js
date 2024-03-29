import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteOrder, listOrders, confirmShip } from "../actions/orderActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import {
  ORDER_CONFIRM_SHIP_RESET,
  ORDER_DELETE_RESET,
} from "../constants/orderConstants";

export default function OrderListPageAdmin(props) {
  const sellerMode = props.match.path.indexOf("/seller") >= 0;
  const orderLists = useSelector((state) => state.orderLists);
  const { loading, error, orders } = orderLists;
  const orderDelete = useSelector((state) => state.orderDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = orderDelete;

  const orderConfirmShip = useSelector((state) => state.orderConfirmShip);
  const {
    loading: loadingConfirm,
    error: errorConfirm,
    success: successConfirm,
  } = orderConfirmShip;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfom } = userLogin;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: ORDER_DELETE_RESET });
    dispatch({ type: ORDER_CONFIRM_SHIP_RESET });
    dispatch(listOrders({ seller: sellerMode ? userInfom._id : "" }));
  }, [dispatch, sellerMode, successDelete, userInfom._id, successConfirm]);
  const deleteHandler = (order) => {
    if (window.confirm("Are you sure to delete?")) {
      dispatch(deleteOrder(order._id));
    }
  };
  const confirmShipHandle = (order) => {
    dispatch(confirmShip(order._id));
  };
  return (
    <div>
      <h1>Orders</h1>
      {loadingDelete && <LoadingBox></LoadingBox>}
      {loadingConfirm && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant="damn">{errorDelete}</MessageBox>}
      {errorConfirm && <MessageBox variant="damn">{errorConfirm}</MessageBox>}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="damn">{error}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th>STATUS</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order?._id}>
                <td>{order?._id}</td>
                <td>{order?.user?.name}</td>
                <td>{order?.createdAt?.substring(0, 10)}</td>
                <td>{order?.totalPrice?.toFixed(2)}</td>
                <td>
                  {order?.isPaid ? order?.paidAt?.substring(0, 10) : "No"}
                </td>
                <td>
                  {order.status === 'Received' || order.isDelivered
                    ? order?.deliveredAt?.substring(0, 10)
                    : "No"}
                </td>
                <td>{order?.status}</td>
                <td>
                  <button
                    style={{ background: "#ececa3" }}
                    type="button"
                    className="min-1"
                    onClick={() => {
                      props.history.push(`/order/${order._id}`);
                    }}
                  >
                    <i class="fas fa-eye"></i> Details
                  </button>

                  {order?.status === "Processing" && (
                    <button
                      style={{ background: "#31B404" }}
                      type="button"
                      className="min-1"
                      onClick={() => confirmShipHandle(order)}
                    >
                      <i class="fas fa-shipping-fast"></i> Shipping
                    </button>
                  )}
                  <button
                    style={{ background: "#FF6B6B" }}
                    type="button"
                    className="min-1"
                    onClick={() => deleteHandler(order)}
                  >
                    <i class="fas fa-trash-alt"></i> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
