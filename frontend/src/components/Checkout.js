import React from 'react';

export default function Checkout(props) {
    return (
        <div className="row checkout">
      <div className={props.step1 ? 'active' : ''}>Login</div>
      <div className={props.step2 ? 'active' : ''}>Delivery</div>
      <div className={props.step3 ? 'active' : ''}>Payment</div>
      <div className={props.step4 ? 'active' : ''}>Place Order</div>
    </div>
    );
}
