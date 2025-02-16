type Props = {
  img: string;
  title: string;
  description: string;
};

const HighlightItem: React.FC<Props> = ({ img, title, description }) => {
  return (
    <div className="flex flex-row justify-evenly items-center space-x-4">
      <img src={img} alt="" className="w-20 aspect-[1/1]" />
      <div className="flex flex-col">
        <h2 className="text-3xl lg:text-2xl font-bold text-white">{title}</h2>
        <p className="text-xl lg:text-lg text-white">{description}</p>
      </div>
    </div>
  );
};

export default HighlightItem;
