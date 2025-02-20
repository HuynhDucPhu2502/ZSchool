import { Link } from "react-router-dom";

import Logo from "../../assets/logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-gray-900 text-white py-8">
      <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4 justify-around items-center ">
        <div className="flex flex-row justify-between items-center bg-gray-800 rounded-lg px-4 py-2">
          <img src={Logo} alt="" className="w-24 h-24" />
          <div className="flex flex-col">
            <h1 className="text-xl md:text-3xl text-blue-400 font-bold">
              ZSchool
            </h1>
            <p className="md:text-lg">Học hôm nay, dẫn đầu ngày mai</p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
          <Link to="zschool" className="text-lg hover:text-blue-600">
            Trang chủ
          </Link>
          <Link to="zschool/courses" className="text-lg hover:text-blue-600">
            Khóa học
          </Link>
          <Link to="zschool/contact" className="text-lg hover:text-blue-600">
            Liên hệ
          </Link>
        </div>

        <div className="flex flex-col text-gray-300 text-center">
          <p>Hotline: 1900 1234 – Email: huynhducphu2502@gmail.com </p>
          <p>Chịu trách nhiệm nội dung: Huỳnh Đức Phú</p>
        </div>
      </div>

      <div className="text-center text-gray-500 text-sm mt-6 border-t border-gray-700 pt-4">
        © {currentYear} ZSchool. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
