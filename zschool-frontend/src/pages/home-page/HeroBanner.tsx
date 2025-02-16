import { Button } from "../../components/ui/button";

import banner from "../../assets/banner.png";

const HeroBanner = () => {
  return (
    <div
      style={{ backgroundImage: `url(${banner})` }}
      className="bg-cover bg-center bg-no-repeat w-full aspect-[8/3] flex justify-center items-center"
    >
      <div className="lg:max-w-4xl lg:h-1/2 bg-black/50 p-24 flex flex-col items-center justify-center text-white gap-4  ">
        <h2 className="text-5xl font-bold">Chào mừng đến với ZSchool!</h2>
        <p className="lg:text-lg">
          ZSchool được thành lập với sứ mệnh mang giáo dục chất lượng cao đến
          mọi người. Với đội ngũ giảng viên hàng đầu và phương pháp giảng dạy
          hiện đại, chúng tôi cam kết giúp bạn phát triển kỹ năng, mở rộng tri
          thức và chinh phục tương lai!
        </p>
        <Button className="mt-4">TÌM HIỂU THÊM</Button>
      </div>
    </div>
  );
};

export default HeroBanner;
