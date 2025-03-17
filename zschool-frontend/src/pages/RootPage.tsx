import { Outlet } from "react-router-dom";

import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import ScrollToTop from "../components/layout/ScrollToTop";
import store from "../store";
import { fetchUserProfile } from "../services/authService";

const RootPage = () => {
  return (
    <>
      <ScrollToTop />
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export const Loader = async () => {
  try {
    await store.dispatch(fetchUserProfile()).unwrap();
  } catch (error) {
    console.log(error);
  }
};

export default RootPage;
