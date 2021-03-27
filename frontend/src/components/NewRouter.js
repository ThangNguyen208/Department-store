import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

export default function NewRoute({component: Component, ...rest}) {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfom } = userLogin;
  return (
    <Route
    {...rest}
    render={(props) =>
      userInfom ? (
        <Component {...props}></Component>
      ) : (
        <Redirect to="/login" />
      )
    }
  ></Route>
  );
}
