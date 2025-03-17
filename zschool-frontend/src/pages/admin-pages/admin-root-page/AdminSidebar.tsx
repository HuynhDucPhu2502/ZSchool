import { BookOpen, ReceiptText, User, Users } from "lucide-react";
import AdminNavItem from "./AdminNavItem";

const AdminSidebar = () => {
  return (
    <div className="w-1/6 h-screen bg-gradient-to-b from-blue-700 to-blue-900 shadow-lg flex flex-col">
      {/* Header */}
      <div className="border-2 border-gray-400 py-6 flex flex-col justify-center items-center bg-blue-900 h-[100px]">
        <h1 className="text-xl font-bold text-white">ZSchool Admin</h1>
      </div>

      {/* Menu */}
      <nav className="mt-6 flex flex-col space-y-3 px-4">
        <AdminNavItem icon={<ReceiptText />} text="Xem liên hệ" />
        <AdminNavItem icon={<User />} text="Quản lý tài khoản" />
        <AdminNavItem icon={<Users />} text="Quản lý giảng viên" />
        <AdminNavItem icon={<BookOpen />} text="Quản lý khóa học" />
      </nav>
    </div>
  );
};

export default AdminSidebar;
