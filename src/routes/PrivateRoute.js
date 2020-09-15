import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

import UserContext from "../services/userContext";

const PrivateRoute = ({ children, ...rest }) => {
  const { isLogged } = useContext(UserContext);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isLogged() ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
