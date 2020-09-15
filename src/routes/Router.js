import React, { useContext } from "react";
import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom";

import UserContext from "../services/userContext";

import Login from "../pages/Login";
import SalaPage from "../pages/SalaPage";
import WorkspacePage from "../pages/WorkspacePage";
import ReuniaoPage from "../pages/MeetingPage";
import WorkspaceUserPage from "../pages/WorkspaceUserPage";
import PrivateRoute from "./PrivateRoute";

const Router = () => {
  const { isLogged } = useContext(UserContext);
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {isLogged() ? <SalaPage /> : <Login />}
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <PrivateRoute path="/salas">
            <SalaPage />
          </PrivateRoute>
          <PrivateRoute path="/reuniao">
            <ReuniaoPage />
          </PrivateRoute>
          <PrivateRoute exact path="/workspaces">
            <WorkspacePage />
          </PrivateRoute>
          <PrivateRoute path="/workspaces/horario">
            <WorkspaceUserPage />
          </PrivateRoute>
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default Router;
