import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Link, Route } from "react-router-dom";
import { logout } from "./actions/userActions";
import AdminRoute from "./components/AdminRoute";
import NewRoute from "./components/NewRouter";
import SearchBox from "./components/SearchBox";
import SellerRoute from "./components/SellerRoute";
import CartScreen from "./screens/CartScreen";
import DeliveryAdressPage from "./screens/DeliveryAdressPage";
import HomePage from "./screens/HomePage";
import LoginPage from "./screens/LoginPage";
import OrderHistoryPage from "./screens/OrderHistoryPage";
import OrderListPage from "./screens/OrderListPage";
import OrderPage from "./screens/OrderPage";
import PaymentPage from "./screens/PaymentPage";
import PlaceOrderPage from "./screens/PlaceOrderPage";
import ProductEditPage from "./screens/ProductEditPage";
import ProductListPage from "./screens/ProductListPage";
import ProductPage from "./screens/ProductPage";
import ProfilePage from "./screens/ProfilePage";
import RegisterPage from "./screens/RegisterPage";
import SearchPage from "./screens/SearchPage";
import SellerPage from "./screens/SellerPage";
import UserEditPage from "./screens/UserEditPage";
import UserListPage from "./screens/UserListPage";
import { listProductCategories } from "./actions/productActions";
import LoadingBox from "./components/LoadingBox";
import MessageBox from "./components/MessageBox";
import MessengerCustomerChat from 'react-messenger-customer-chat';

function App() {
 
  const cart = useSelector((state) => state.cart);
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const { cartItems } = cart;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfom } = userLogin;
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logout());
  };
  const productCategoryList = useSelector((state) => state.productCategoryList);
  const {
    loading: loadingCategories,
    error: errorCategories,
    categories,
  } = productCategoryList;
  useEffect(() => {
    dispatch(listProductCategories());
  }, [dispatch]);
  return (
    <BrowserRouter>
      <div className="grid">
    <MessengerCustomerChat
      pageId="<109605787890463>"
      appId="<867403147141936>"
      htmlRef={window.location.pathname}
    />
        <header className="row">
          <div>
            <button
              type="button"
              className="open-sidebar"
              onClick={() => setSidebarIsOpen(true)}
            >
              <i className="fa fa-bars"></i>
            </button>
            <Link className="logo" to="/">
            <img src="https://i.ibb.co/0nfNbwg/1.png" alt="Footer Logo" />
            </Link>
          </div>
          <div>
            <Route
              render={({ history }) => (
                <SearchBox history={history}></SearchBox>
              )}
            ></Route>
          </div>
          <div>
            <Link to="/cart">
              <i class="fas fa-cart-plus"></i>
              {cartItems.length > 0 && (
                <span className="icon">{cartItems.length}</span>
              )}
            </Link>
            {/* <Link to="/register">Registration</Link> */}

            {userInfom ? (
              <div className="dropdown">
                <Link to="#">
                  {userInfom.name} <i className="fa fa-caret-down"></i>{" "}
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/orderhistory">
                      <i class="fas fa-history"></i> History{" "}
                    </Link>
                  </li>
                  <li>
                    <Link to="/profile">
                      {" "}
                      <i class="fas fa-id-card"></i> Profile
                    </Link>
                  </li>
                  <li>
                    <Link to="#logout" onClick={logoutHandler}>
                      <i class="fas fa-sign-out-alt"></i> Logout
                    </Link>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/login">Login</Link>
            )}

            {userInfom && userInfom.isSeller && (
              <div className="dropdown">
                <Link to="#admin">
                  Seller <i className="fa fa-caret-down"></i>
                </Link>
                <ul
                  className="dropdown-content"
                  style={{ textAlign: "center" }}
                >
                  <li style={({ textAlign: "center" }, { display: "flex" })}>
                    <Link to="/productlist/seller">
                      <i class="fas fa-archive"></i> Product
                    </Link>
                  </li>
                  <li style={({ textAlign: "center" }, { display: "flex" })}>
                    <Link to="/orderlist/seller">
                      <i className="fas fa-shopping-basket"></i> Order
                    </Link>
                  </li>
                </ul>
              </div>
            )}

            {userInfom && userInfom.isAdmin && (
              <div className="dropdown">
                <Link to="#admin">
                  Admin <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  <li style={({ textAlign: "center" }, { display: "flex" })}>
                    <Link to="/dashboard">
                      <sr>
                        <i class="fas fa-chart-line"></i>
                      </sr>{" "}
                      Dashboard
                    </Link>
                  </li>
                  <li style={({ textAlign: "center" }, { display: "flex" })}>
                    <Link to="/productlist">
                      <sr>
                        <i class="fas fa-archive"></i>
                      </sr>{" "}
                      Product
                    </Link>
                  </li>
                  <li>
                    <Link to="/orderlist">
                      <i className="fas fa-shopping-basket"></i> Order
                    </Link>
                  </li>
                  <li>
                    <Link to="/userlist">
                      <i class="fas fa-users"></i> User
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </header>
        <aside className={sidebarIsOpen ? "open" : ""}>
          <ul className="categories">
            <li>
              <strong>CATEGORIES</strong>
              <button
                onClick={() => setSidebarIsOpen(false)}
                className="close-sidebar"
                type="button"
              >
                <i className="fa fa-close"></i>
              </button>
            </li>
            {loadingCategories ? (
              <LoadingBox></LoadingBox>
            ) : errorCategories ? (
              <MessageBox variant="damn">{errorCategories}</MessageBox>
            ) : (
              categories.map((c) => (
                <li key={c}>
                  <Link
                    to={`/search/category/${c}`}
                    onClick={() => setSidebarIsOpen(false)}
                  >
                    {c}
                  </Link>
                </li>
              ))
            )}
          </ul>
        </aside>
        <main>
          <Route path="/seller/:id" component={SellerPage}></Route>
          <Route path="/cart/:id?" component={CartScreen}></Route>
          <Route path="/product/:id" component={ProductPage} exact></Route>
          <Route
            path="/product/:id/edit"
            component={ProductEditPage}
            exact
          ></Route>
          <Route path="/login" component={LoginPage}></Route>
          <Route path="/register" component={RegisterPage}></Route>
          <Route path="/delivery" component={DeliveryAdressPage}></Route>
          <Route path="/payment" component={PaymentPage}></Route>
          <Route path="/placeorder" component={PlaceOrderPage}></Route>
          <Route path="/order/:id" component={OrderPage}></Route>
          <Route path="/orderhistory" component={OrderHistoryPage}></Route>
          <Route
            path="/search/name/:name?"
            component={SearchPage}
            exact
          ></Route>
          <Route
            path="/search/category/:category"
            component={SearchPage}
            exact
          ></Route>
          <Route
            path="/search/category/:category/name/:name"
            component={SearchPage}
            exact
          ></Route>
          <Route
            path="/search/category/:category/name/:name/min/:min/max/:max/rating/:rating/order/:order"
            component={SearchPage}
            exact
          ></Route>
          <NewRoute path="/profile" component={ProfilePage}></NewRoute>
          <AdminRoute
            path="/productlist"
            component={ProductListPage}
            exact
          ></AdminRoute>
          <AdminRoute
            path="/orderlist"
            component={OrderListPage}
            exact
          ></AdminRoute>
          <AdminRoute path="/userlist" component={UserListPage}></AdminRoute>
          <AdminRoute
            path="/user/:id/edit"
            component={UserEditPage}
          ></AdminRoute>
          <SellerRoute
            path="/productlist/seller"
            component={ProductListPage}
          ></SellerRoute>
          <SellerRoute
            path="/orderlist/seller"
            component={OrderListPage}
          ></SellerRoute>
          <Route path="/" component={HomePage} exact></Route>
        </main>
        <footer>
          <div className="footer">
            <div className="footer-static-top">
            <div className="container">
              {/* Begin Footer Shipping Area */}
              <div className="footer-shipping pt-60 pb-55 pb-xs-25">
                <div className="row">
                  {/* Begin Li's Shipping Inner Box Area */}
                  <div className="col-lg-3 col-md-6 col-sm-6 pb-sm-55 pb-xs-55">
                    <div className="li-shipping-inner-box">
                      <div className="shipping-icon">
                        <img src="https://i.ibb.co/T47vHYx/1.png" alt="Shipping Icon" />
                      </div>
                      <div className="shipping-text">
                        <h2>Free Delivery</h2>
                        <p>And free returns. See checkout for delivery dates.</p>
                      </div>
                    </div>
                  </div>
                  {/* Li's Shipping Inner Box Area End Here */}
                  {/* Begin Li's Shipping Inner Box Area */}
                  <div className="col-lg-3 col-md-6 col-sm-6 pb-sm-55 pb-xs-55">
                    <div className="li-shipping-inner-box">
                      <div className="shipping-icon">
                        <img src="https://i.ibb.co/fdWjv2v/2.png" alt="Shipping Icon" />
                      </div>
                      <div className="shipping-text">
                        <h2>Safe Payment</h2>
                        <p>Pay with the world's most popular and secure payment methods.</p>
                      </div>
                    </div>
                  </div>
                  {/* Li's Shipping Inner Box Area End Here */}
                  {/* Begin Li's Shipping Inner Box Area */}
                  <div className="col-lg-3 col-md-6 col-sm-6 pb-xs-30">
                    <div className="li-shipping-inner-box">
                      <div className="shipping-icon">
                        <img src="https://i.ibb.co/tbLjsRY/3.png" alt="Shipping Icon" />
                      </div>
                      <div className="shipping-text">
                        <h2>Shop with Confidence</h2>
                        <p>Our Buyer Protection covers your purchasefrom click to delivery.</p>
                      </div>
                    </div>
                  </div>
                  {/* Li's Shipping Inner Box Area End Here */}
                  {/* Begin Li's Shipping Inner Box Area */}
                  <div className="col-lg-3 col-md-6 col-sm-6 pb-xs-30">
                    <div className="li-shipping-inner-box">
                      <div className="shipping-icon">
                        <img src="https://i.ibb.co/GvHXW7z/4.png" alt="Shipping Icon" />
                      </div>
                      <div className="shipping-text">
                        <h2>24/7 Help Center</h2>
                        <p>Have a question? Call a Specialist or chat online.</p>
                      </div>
                    </div>
                  </div>
                  {/* Li's Shipping Inner Box Area End Here */}
                </div>
              </div>
              {/* Footer Shipping Area End Here */}
            </div>
          </div>
          <div className="footer-static-middle">
            <div className="container">
              <div className="footer-logo-wrap pt-50 pb-35">
                <div className="row">
                  {/* Begin Footer Logo Area */}
                  <div className="col-lg-4 col-md-6">
                    <div className="footer-logo">
                      <img src="https://i.ibb.co/0nfNbwg/1.png" alt="Footer Logo" />
                      <p className="info">
                        MAKING LIFE A LITTLE SWEETER
                </p>
                    </div>
                    <ul className="des">
                      <li>
                        <span>Address: </span>
                        58 Thoi Huu Road, Da Nang, Viet Nam
                </li>
                      <li>
                        <span>Phone: </span>
                        <a href="/">(+123) 222 222 789</a>
                      </li>
                      <li>
                        <span>Email: </span>
                        <a href="http://gmail.com">thangtat208@gmail.com</a>
                      </li>
                    </ul>
                  </div>
                  {/* Footer Logo Area End Here */}
                  {/* Begin Footer Block Area */}
                  <div className="col-lg-2 col-md-3 col-sm-6">
                    <div className="footer-block">
                      <h3 className="footer-block-title">Product</h3>
                      <ul>
                        <li><a href="/">Prices drop</a></li>
                        <li><a href="/">New products</a></li>
                        <li><a href="/">Best sales</a></li>
                        <li><a href="/">Contact us</a></li>
                      </ul>
                    </div>
                  </div>
                  {/* Footer Block Area End Here */}
                  {/* Begin Footer Block Area */}
                  <div className="col-lg-2 col-md-3 col-sm-6">
                    <div className="footer-block">
                      <h3 className="footer-block-title">Our company</h3>
                      <ul>
                        <li><a href="/">Delivery</a></li>
                        <li><a href="/">Legal Notice</a></li>
                        <li><a href="/">About us</a></li>
                        <li><a href="/">Contact us</a></li>
                      </ul>
                    </div>
                  </div>
                  {/* Footer Block Area End Here */}
                  {/* Begin Footer Block Area */}
                  <div className="col-lg-4">
                    <div className="footer-block">
                      <h3 className="footer-block-title">Follow Us</h3>
                      <ul className="social-link">
                        <li className="twitter">
                          <a href="https://twitter.com/" data-toggle="tooltip" title="Twitter">
                            <i className="fa fa-twitter" />
                          </a>
                        </li>
                        <li className="rss">
                          <a href="https://rss.com/" data-toggle="tooltip" title="RSS">
                            <i className="fa fa-rss" />
                          </a>
                        </li>
                        <li className="google-plus">
                          <a href="https://www.plus.google.com/discover" data-toggle="tooltip" title="Google Plus">
                            <i className="fa fa-google-plus" />
                          </a>
                        </li>
                        <li className="facebook">
                          <a href="https://www.facebook.com/" data-toggle="tooltip" title="Facebook">
                            <i className="fa fa-facebook" />
                          </a>
                        </li>
                        <li className="youtube">
                          <a href="https://www.youtube.com/" data-toggle="tooltip" title="Youtube">
                            <i className="fa fa-youtube" />
                          </a>
                        </li>
                        <li className="instagram">
                          <a href="https://www.instagram.com/" data-toggle="tooltip" title="Instagram">
                            <i className="fa fa-instagram" />
                          </a>
                        </li>
                      </ul>
                    </div>        
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>   
        </footer>
      </div>
      
    </BrowserRouter>
  );
}

export default App;
