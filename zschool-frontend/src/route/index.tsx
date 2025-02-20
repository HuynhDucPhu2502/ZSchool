import { createBrowserRouter, Navigate } from "react-router-dom";

import RootPage from "../pages/RootPage";
import HomePage from "../pages/home-page/index.tsx";
import ContactPage from "../pages/contact-page/index.tsx";
import AuthPage from "../pages/auth-page/index.tsx";

const router = createBrowserRouter([
  {
    path: "",
    element: <RootPage />,
    children: [
      { index: true, element: <Navigate to="zschool" replace /> },
      {
        path: "zschool",
        children: [
          { path: "", element: <HomePage /> },
          { path: "contact", element: <ContactPage /> },
          { path: "auth", element: <AuthPage /> },
        ],
      },
    ],
  },
]);

export default router;
