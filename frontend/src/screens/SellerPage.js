import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Product from "../components/Product";
import { listProducts } from "../actions/productActions";
import { detailUser } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Rating from "../components/Rating";

export default function SellerPage(props) {
  const sellerId = props.match.params.id;
  const userDetail = useSelector((state) => state.userDetail);
  const { loading, error, user } = userDetail;

  const productList = useSelector((state) => state.productList);
  const {
    loading: loadingProducts,
    error: errorProducts,
    products,
  } = productList;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(detailUser(sellerId));
    dispatch(listProducts({ seller: sellerId }));
  }, [dispatch, sellerId]);
  return (
    <div className="row top">
      <div className="col-1">
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="damn">{error}</MessageBox>
        ) : (
          <ul className="card card-body">
            <li>
              <div className="row first">
                <div className="p-1">
                  <img
                    className="min-1"
                    src={user.seller.logo}
                    alt={user.seller.name}
                  ></img>
                </div>
                <div className="p-1">
                  <h1>{user.seller.name}</h1>
                </div>
              </div>
            </li>
            <li>
              <Rating
                rating={user.seller.rating}
                numReviews={user.seller.numReviews}
              ></Rating>
            </li>
            <li>
              <a href={`mailto:${user.email}`}>Contact Seller</a>
            </li>
            <li>{user.seller.description}</li>
          </ul>
        )}
      </div>
      <div className="col-3">
        {loadingProducts ? (
          <LoadingBox></LoadingBox>
        ) : errorProducts ? (
          <MessageBox variant="damn">{errorProducts}</MessageBox>
        ) : (
          <>
            {products.length === 0 && <MessageBox>No Product Found</MessageBox>}
            <div className="row center">
              {products.map((product) => (
                <Product key={product._id} product={product}></Product>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
