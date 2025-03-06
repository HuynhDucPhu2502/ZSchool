import { Link } from "react-router-dom";

const FooterMenu = () => {
  const menuItems: { name: string; link: string }[] = [
    { name: "Trang chủ", link: "/zschool" },
    { name: "Khóa học", link: "/zschool/courses" },
    { name: "Liên hệ", link: "/zschool/contact" },
  ];

  return (
    <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
      {menuItems.map((item, index) => (
        <Link
          to={item.link}
          className="text-lg hover:text-blue-600"
          key={index}
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
};

export default FooterMenu;
