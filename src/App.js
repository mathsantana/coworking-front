import React, { useState } from "react";

import Router from "./routes/Router";
import UserContext from "./services/userContext";

function App() {
  const [token, setToken] = useState(localStorage.getItem("@COWRKNG:TOKEN"));
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("@COWRKNG:USER"))
  );

  const handleLogout = () => {
    localStorage.removeItem("@COWRKNG:TOKEN");
    localStorage.removeItem("@COWRKNG:USER");
    setToken(null);
    setUser(null);
  };

  const loginProcedure = (token, user) => {
    localStorage.setItem("@COWRKNG:TOKEN", token);
    localStorage.setItem("@COWRKNG:USER", JSON.stringify(user));
    setToken(token);
    setUser(user);
  };

  const isLogged = () => {
    return localStorage.getItem("@COWRKNG:TOKEN") || token;
  };

  return (
    <div className="App">
      <UserContext.Provider
        value={{ user, token, loginProcedure, handleLogout, isLogged }}
      >
        <Router />
      </UserContext.Provider>
    </div>
  );
}

export default App;
