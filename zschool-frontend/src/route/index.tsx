import { createBrowserRouter, Navigate } from "react-router-dom";

import RootPage from "../pages/RootPage";
import HomePage from "../pages/home-page";

const router = createBrowserRouter([
  {
    path: "",
    element: <RootPage />,
    children: [
      { index: true, element: <Navigate to="zschool" replace /> },
      { path: "zschool", children: [{ index: true, element: <HomePage /> }] },
    ],
  },
]);

export default router;
