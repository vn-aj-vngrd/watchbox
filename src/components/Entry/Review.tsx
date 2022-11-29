import { SubmitHandler, useForm } from "react-hook-form";
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
      review: review || "",
    });
  }, [reset, review]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    updateReview.mutateAsync({
      id: entryId as string,
      review: data.review,
    });
  };

  return (
    <>
      <div className="border-t border-darkColor">
        <p className="pt-3 text-lg">My Review</p>
        <form onSubmit={handleSubmit(onSubmit)} className="mb-2 pt-3 ">
          <div className="mb-4 w-full rounded-lg bg-gray-100 dark:border-darkColor dark:bg-darkColor">
            <div
              className={`bg-gray-100 px-4 py-2 dark:bg-neutral-700 ${
                review_watch !== review ? "rounded-t-lg" : "rounded-lg"
              }`}
            >
              <textarea
                {...register("review")}
                rows={4}
                className="w-full bg-gray-100 py-1 text-sm dark:bg-neutral-700 dark:text-white"
                placeholder="Write a review..."
              ></textarea>
            </div>
            <div className="dark:bg-dark flex items-center justify-end border-t px-3 py-2 dark:border-neutral-500">
              <button
                type="submit"
                disabled={review_watch === review}
                className="inline-flex w-28 justify-center rounded-lg bg-blue-600 py-2.5 px-4 text-xs font-medium focus:ring-4 focus:ring-blue-200 enabled:text-white disabled:bg-blue-600/60 disabled:text-white/60 enabled:hover:bg-blue-700 dark:focus:ring-blue-900"
              >
                Save Review
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Review;
