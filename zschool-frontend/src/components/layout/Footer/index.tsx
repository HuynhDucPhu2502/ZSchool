import CopyRightNotice from "./CopyrightNotice";
import FooterInfo from "./FooterInfo";
import FooterLogo from "./FooterLogo";
import FooterMenu from "./FooterMenu";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-900 text-white py-8">
      <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4 justify-around items-center ">
        <FooterLogo />
        <FooterMenu />
        <FooterInfo />
      </div>

      <CopyRightNotice />
    </footer>
  );
};

export default Footer;
