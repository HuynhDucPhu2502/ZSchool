import Logo from "../../../assets/logo.png";

const FooterLogo = () => {
  return (
    <div className="flex flex-row justify-between items-center bg-gray-800 rounded-lg px-4 py-2">
      <img src={Logo} alt="" className="w-24 h-24" />
      <div className="flex flex-col">
        <h1 className="text-xl md:text-3xl text-blue-400 font-bold">ZSchool</h1>
        <p className="md:text-lg">Học hôm nay, dẫn đầu ngày mai</p>
      </div>
    </div>
  );
};

export default FooterLogo;
