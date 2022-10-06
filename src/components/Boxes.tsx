// components/Boxes.tsx

type Props = {
  boxes?: {
    boxTitle: string;
  }[];
};

const Boxes: React.FC<Props> = ({ boxes }) => {

  return (
    <div className="grid md:w-full w-[80%] gap-x-14 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-y-6 md:gap-y-8 mx-auto">
      {boxes?.map((box, index) => (
        <button key={index} className="flex flex-col items-center group">
          {/* <div className={`grid ${box.boxEntriesCount > 1 ? "grid-cols-2 grid-rows-2" : "grid-cols-1"} gap-3 w-32 p-4 transition duration-150 ease-in-out bg-blue-200 rounded-lg shadow-sm lg:w-36 aspect-square hover:scale-105`}>
            
            {Array.from(Array(box.boxEntriesCount).keys()).filter((item, count) => count < 4).map(entry => 
              <div key={entry} className="bg-white rounded-lg"></div>
            )}

          </div> */}
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
