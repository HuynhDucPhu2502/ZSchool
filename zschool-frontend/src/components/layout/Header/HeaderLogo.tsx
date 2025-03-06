import Logo from "../../../assets/logo.png";
import { Link } from "react-router-dom";

const HeaderLogo = () => {
  return (
    <Link to="/" className="flex flex-row items-center lg:gap-4">
      <img src={Logo} alt="" className="w-24 h-24" />
      <div className="flex flex-col">
        <h1 className="text-xl md:text-3xl text-blue-400 font-bold">ZSchool</h1>
        <p className="md:text-lg">Học hôm nay, dẫn đầu ngày mai</p>
      </div>
    </Link>
  );
};

export default HeaderLogo;
