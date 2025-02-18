import { createBrowserRouter, Navigate } from "react-router-dom";

import RootPage from "../pages/RootPage";
import HomePage from "../pages/home-page/index.tsx";
import ContactPage from "../pages/contact-page/index.tsx";

const router = createBrowserRouter([
  {
    path: "",
    element: <RootPage />,
    children: [
      { index: true, element: <Navigate to="zschool" replace /> },
      {
        path: "zschool",
        children: [
          { index: true, element: <HomePage /> },
          { path: "contact", element: <ContactPage /> },
        ],
      },
    ],
  },
]);

export default router;
