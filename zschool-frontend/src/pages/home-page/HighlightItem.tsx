type Props = {
  img: string;
  title: string;
  description: string;
  last?: boolean;
};

const HighlightItem: React.FC<Props> = ({ img, title, description, last }) => {
  return (
    <>
      <div className="grid grid-cols-2 px-4">
        <div className="flex justify-center items-center">
          <img src={img} alt="" className="block mx-auto w-24 aspect-[4/3]" />
        </div>
        <div className="flex flex-col justify-center">
          <h2 className="text-3xl lg:text-2xl font-bold text-white">{title}</h2>
          <p className="text-xl lg:text-lg text-white">{description}</p>
        </div>
      </div>
      {!last && <hr className="lg:hidden" />}
    </>
  );
};

export default HighlightItem;
