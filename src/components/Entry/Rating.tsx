import { useState } from "react";
import StarRating from "react-svg-star-rating";
import { trpc } from "../../utils/trpc";

type Props = {
  rating: number | undefined;
  refetch: () => void;
  entryId: string | undefined;
};

const ratingDesc = ["No Rating", "Very Bad", "Bad", "Neutral", "Good", "Perfect"];

const Rating = ({ rating, refetch, entryId }: Props) => {
  const [currentRating, setCurrentRating] = useState(rating || 0);

  const updateRating = trpc.useMutation("entry.updateRating", {
    onSuccess: () => {
      refetch();
      document.dispatchEvent(new Event("visibilitychange"));
    },
  });

  const handleOnClick = (currentRating: number) => {
    setCurrentRating(currentRating);

    updateRating.mutateAsync({
      id: entryId as string,
      rating: currentRating,
    });
  };

  return (
    <div>
      <p className="pt-3.5 text-lg">My Rating</p>
      <div className="my-3 flex items-center justify-start space-x-4">
        <div>
          <StarRating
            handleOnClick={handleOnClick}
            initialRating={currentRating}
            innerRadius={25}
            outerRadius={45}
            containerClassName="flex space-x-2 flex flex-row items-center justify-center"
          />
        </div>

        <p className="rounded-md bg-gray-200 px-4 py-0.5 text-black">{ratingDesc[currentRating]}</p>
      </div>
    </div>
  );
};

export default Rating;
