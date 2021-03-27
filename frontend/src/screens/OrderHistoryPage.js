import React, { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { listOrder } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
export default function OrderHistoryPage(props) {
    const orderList = useSelector((state) => state.orderList);
    const { loading, error, orders} = orderList;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(listOrder());
    }, [dispatch]);
    return (
        <div>
        <h1>Order History</h1>
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="damn">{error}</MessageBox>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.totalPrice.toFixed(2)}</td>
                  <td>{order.isPaid ? order.paidAt.substring(0, 10) : 'Not Paid'}</td>
                  <td>
                    {order.isDelivered
                      ? order.deliveredAt.substring(0, 10)
                      : 'Not Delivered'}
                  </td>
                  <td>
                    <button 
                    style={{background: "#ececa3"}}
                      type="button"
                      className="min"
                      onClick={() => {
                        props.history.push(`/order/${order._id}`);
                      }}
                    >
                      <i class="fas fa-eye"></i> View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    )
}
