type Props = {
  boxes: {
    boxTitle: string;
    boxEntriesCount: number;
  }[];
};

const Boxes: React.FC<Props> = ({ boxes }) => {
  return (
    <div className="grid md:w-full w-[80%] gap-x-14 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-y-6 md:gap-y-8 mx-auto">
      {boxes?.map((box, index) => (
        <button key={index} className="flex flex-col items-center group">
          <div className="w-32 transition duration-150 ease-in-out bg-blue-600 rounded-lg shadow-sm lg:w-36 aspect-square hover:scale-105"></div>
          <div className="p-2 text-center bg-transparent">
            <p className="subpixel-antialiased font-normal text-gray-600 dark:text-white">
              {box?.boxTitle}
            </p>
          </div>
        </button>
      ))}
    </div>
  );
};

export default Boxes;
