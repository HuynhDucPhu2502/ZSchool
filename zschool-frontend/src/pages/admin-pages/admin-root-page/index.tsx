import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import Clock from "./Clock";

const AdminRootPage = () => {
  return (
    <div className="h-screen flex">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Content Area */}
      <div className="w-5/6 h-screen bg-gray-100">
        <div className="h-[50px] flex flex-row justify-between items-center px-8 bg-gradient-to-r from-blue-700 to-blue-900 shadow-md">
          <p className="text-white font-semibold text-lg">
            Xin chào, <span className="capitalize">Huỳnh Đức Phú</span>
          </p>
          <Clock />
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminRootPage;
