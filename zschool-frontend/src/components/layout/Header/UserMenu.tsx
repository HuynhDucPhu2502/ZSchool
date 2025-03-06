import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../../services/authService";
import UserLogoutModal from "./UserLogoutModal";
import { useMutation } from "@tanstack/react-query";

const UserMenu = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch<AppDispatch>();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLogoutPromptVisible, setIsLogoutPromptVisible] = useState(false);

  const { mutate, error, isPending, isError } = useMutation({
    mutationFn: async () => {
      return dispatch(logout()).unwrap();
    },
    onSuccess: () => {
      setIsLogoutPromptVisible(false);
    },
  });

  const handleShowLogoutPrompt = () => {
    setIsDropdownOpen(false);
    setIsLogoutPromptVisible(true);
  };

  const handleCloseLogoutPrompt = () => {
    setIsLogoutPromptVisible(false);
  };

  const handleLogout = () => {
    mutate();
  };

  return (
    <>
      {isLogoutPromptVisible && (
        <UserLogoutModal
          onClose={handleCloseLogoutPrompt}
          onLogout={handleLogout}
          isPending={isPending}
          isError={isError}
          error={error}
        />
      )}

      <div className="relative">
        <div
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="bg-blue-500 text-white font-bold px-4 py-2 rounded-lg hover:bg-blue-700 cursor-pointer"
        >
          <p>{user?.name}</p>
        </div>

        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-50 bg-white border rounded-lg shadow-lg ">
            <Link
              to="/zschool/profile"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 text-left"
            >
              Thông tin tài khoản
            </Link>
            <button
              onClick={handleShowLogoutPrompt}
              className="w-full px-4 py-2 text-gray-700 hover:bg-gray-100 text-left"
            >
              Đăng xuất
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default UserMenu;
