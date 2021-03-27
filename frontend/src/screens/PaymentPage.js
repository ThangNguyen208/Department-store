import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { savePayment } from "../actions/cartActions";
import Checkout from "../components/Checkout";

export default function PaymentPage(props) {
  const cart = useSelector((state) => state.cart);
  const { deliveryAddress } = cart;
  if (!deliveryAddress.address) {
    props.history.push("/delivery");
  }
  const [payment, setPayment] = useState("PayPal");
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePayment(payment));
    props.history.push("/placeorder");
  };
  return (
    <div>
      <Checkout step1 step2 step3></Checkout>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Payment</h1>
        </div>
        <div>
          <div>
            <input
              type="radio"
              id="paypal"
              value="PayPal"
              name="payment"
              required
              checked
              onChange={(e) => setPayment(e.target.value)}
            ></input>
            <label htmlFor="paypal">PayPal</label>
          </div>
        </div>
        <div>
          <div>
            <input
              type="radio"
              id="stripe"
              value="Stripe"
              name="payment"
              required
              onChange={(e) => setPayment(e.target.value)}
            ></input>
            <label htmlFor="stripe">Stripe</label>
          </div>
        </div>
        <div>
          <div>
            <input
              type="radio"
              id="cash"
              value="Cash"
              name="payment"
              required
              onChange={(e) => setPayment(e.target.value)}
            ></input>
            <label htmlFor="cash">Cash</label>
          </div>
        </div>
        <div>
          <label />
          <button className="primary" type="submit">
            Place Order
          </button>
        </div>
      </form>
    </div>
  );
}
