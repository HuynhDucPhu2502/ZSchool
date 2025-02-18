import ptt from "../../assets/highlights-ptt.png";
import member from "../../assets/highlights-member.png";
import nt from "../../assets/highlights-nt.png";
import HighlightItem from "./HighlightItem";

const Highlights = () => {
  return (
    <div className="my-4 p-6 lg:p-12 mx-auto w-3/4 bg-gradient-to-r from-blue-500 via-blue-400 to-blue-600 rounded-lg shadow-lg">
      <div className="grid grid-cols-1 lg:grid-cols-3 py-10 lg:py-4 gap-y-20 lg:gap-y-0 lg:gap-x-12 w-full h-full p">
        <HighlightItem
          title="10+ Năm"
          description="Giáo dục và phát triển"
          img={ptt}
        />
        <HighlightItem
          title="1.000.000+"
          description="Học viên đã tham gia"
          img={member}
        />
        <HighlightItem
          title="98%"
          description="Học viên hài lòng"
          img={nt}
          last
        />
      </div>
    </div>
  );
};

export default Highlights;
