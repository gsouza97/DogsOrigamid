import React from "react";
import { UserContext } from "../../UserContext";
import { Route, Navigate } from "react-router-dom";

const ProtectedRoute = (props) => {
  const context = React.useContext(UserContext);

  if (context.login === true) {
    return <Route {...props} />;
  } else if (context.login === false) {
    return <Navigate to="/login" />;
  } else {
    return null;
  }
};

export default ProtectedRoute;
