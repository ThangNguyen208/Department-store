import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart, removeFromCart } from "../actions/cartActions";
import MessageBox from "../components/MessageBox";

export default function CartScreen(props) {
  const productId = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1;
  const cart = useSelector((state) => state.cart);
  const { cartItems, error } = cart;

  const dispatch = useDispatch();
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const HandlerremoveCart = (id) => {
    dispatch(removeFromCart(id));
  };

  const Handlercheckout = () => {
    props.history.push("/login?redirect=delivery");
  };
  return (
    <div className="row top">
      <div className="col-2">
        <h1>Home / Cart</h1>
        {error && <MessageBox variant="damn">{error}</MessageBox>}
        {cartItems.length === 0 ? (
          <MessageBox>
            Warning. <Link to="/">Proceed Shopping!!!</Link>
          </MessageBox>
        ) : (
          <ul>
            {cartItems.map((item) => (
              <li key={item.product}>
                <div className="row">
                  <div>
                    <img src={item.image} alt={item.name} className="min"></img>
                  </div>
                  <div className="min-1">
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </div>
                  <div>
                    <select
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>${item.price}</div>
                  <div>
                    <button
                      style={{ background: "#FF6B6B" }}
                      type="button"
                      onClick={() => HandlerremoveCart(item.product)}
                    >
                      <i class="fas fa-trash-alt"></i> Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="col-1">
        <div className="card card-body">
          <ul>
            <li>
              <h2>
                Total ({cartItems.reduce((a, c) => a + c.qty, 0)} items) : $
                {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
              </h2>
            </li>
            <li>
              <button
                type="button"
                onClick={Handlercheckout}
                className="primary block"
                disabled={cartItems.length === 0}
              >
                <i class="fas fa-cart-plus"></i> Order Now
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
