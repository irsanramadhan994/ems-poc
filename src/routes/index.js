import React, { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";

const LoginPage = lazy(() => import("../pages/LoginPage"));
const MainPage = lazy(() => import("../pages/MainPage"));

const router = createBrowserRouter([
  {
    path: "main",
    element: <MainPage />,
  },

  {
    path: "login",
    element: <LoginPage />,
  },
  {
    path: "*",
    element: <Navigate to="/login" />,
  },
]);

export default router;
