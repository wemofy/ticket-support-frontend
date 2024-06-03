import React, { lazy } from "react";
import { Navigate } from "react-router-dom";
import Loadable from "../layouts/full/shared/loadable/Loadable";

/* ***Layouts**** */
const FullLayout = Loadable(lazy(() => import("../layouts/full/FullLayout")));
const BlankLayout = Loadable(
  lazy(() => import("../layouts/blank/BlankLayout"))
);

/* ****Pages***** */
const Dashboard = Loadable(lazy(() => import("../views/dashboard/Dashboard")));
const Error = Loadable(lazy(() => import("../views/authentication/Error")));
const Register = Loadable(
  lazy(() => import("../views/authentication/Register"))
);
const Login = Loadable(lazy(() => import("../views/authentication/Login")));
const TicketDetails = Loadable(
  lazy(() => import("../views/tickets/TicketDetails"))
);

const Router = [
  {
    path: "/",
    element: <FullLayout />,
    children: [
      { path: "/", element: <Navigate to="/dashboard" /> },
      { path: "/dashboard", exact: true, element: <Dashboard /> },
      { path: "/ticket/:ticketId", exact: true, element: <TicketDetails /> },
      { path: "*", element: <Navigate to="/auth/404" /> },
    ],
  },
  {
    path: "/auth",
    element: <BlankLayout />,
    children: [
      { path: "404", element: <Error /> },
      { path: "/auth/register", element: <Register /> },
      { path: "/auth/login", element: <Login /> },
      { path: "*", element: <Navigate to="/auth/404" /> },
    ],
  },
];

export default Router;
