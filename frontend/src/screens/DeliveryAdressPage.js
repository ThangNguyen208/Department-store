import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { saveDeliveryAddress } from '../actions/cartActions';
import Checkout from '../components/Checkout'

export default function DeliveryAdressPage(props) {
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfom } = userLogin;
    const cart = useSelector(state => state.cart);
    const {deliveryAddress} = cart;
    if (!userInfom) {
        props.history.push('/login');
    }
    const [fullName, setFullName] = useState(deliveryAddress.fullName);
    const [address, setAddress] = useState(deliveryAddress.address);
    const [city, setCity] = useState(deliveryAddress.city);
    const [country, setCountry] = useState(deliveryAddress.country);
    const dispatch = useDispatch();
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveDeliveryAddress({fullName, address, city, country}));
        props.history.push('/payment');
    };
    return (
        <div>
      <Checkout step1 step2></Checkout>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Delivery Address</h1>
        </div>
        <div>
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            placeholder="Enter full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            placeholder="Enter address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            placeholder="Enter city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="country">Country</label>
          <input
            type="text"
            id="country"
            placeholder="Enter country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label />
          <button className="primary" type="submit">
            Payment
          </button>
        </div>
      </form>
    </div>
    )
}
