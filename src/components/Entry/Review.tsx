import { SubmitHandler, useForm } from "react-hook-form";
import { StarIcon } from "@heroicons/react/24/solid";
import { useEffect } from "react";
import { trpc } from "../../utils/trpc";

type Inputs = {
  review: string;
};

type Props = {
  review: string | undefined;
  refetch: () => void;
  entryId: string | undefined;
};

const Review = ({ review, refetch, entryId }: Props) => {
  const { register, handleSubmit, watch, reset } = useForm<Inputs>();

  const review_watch = watch("review");

  const updateReview = trpc.useMutation("entry.updateReview", {
    onSuccess: () => {
      refetch();
      document.dispatchEvent(new Event("visibilitychange"));
    },
  });

  useEffect(() => {
    reset({
      review: review || " ",
    });
  }, [reset]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data);
    updateReview.mutateAsync({
      id: entryId as string,
      review: data.review,
    });
  };

  return (
    <>
      <p className="pt-3.5 text-sm">My Review</p>
      <form onSubmit={handleSubmit(onSubmit)} className="pt-3">
        <div className="mb-4 w-full rounded-lg bg-gray-100 pt-1 dark:border-darkColor dark:bg-darkColor">
          <div className="rounded-t-lg bg-gray-100 px-4 py-2 dark:bg-darkColor">
            <textarea
              {...register("review")}
              rows={4}
              className="w-full bg-gray-100 px-1 py-1 text-sm dark:bg-darkColor dark:text-white dark:placeholder-gray-400"
              placeholder="Write a review..."
            ></textarea>
          </div>
          {review_watch !== review ? (
            <div className="flex items-center justify-end border-t px-3 py-2 dark:border-darkColor">
              <button
                type="submit"
                className="inline-flex items-center rounded-lg bg-blue-600 py-2.5 px-4 text-center text-xs font-medium text-white  hover:bg-blue-700"
              >
                Save Review
              </button>
            </div>
          ) : null}
        </div>
      </form>
    </>
  );
};

export default Review;
