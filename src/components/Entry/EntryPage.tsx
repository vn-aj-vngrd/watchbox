import { useEffect, useState } from "react";
import EntryHeader from "../Entry/EntryHeader";
import Review from "../Entry/Review";
import Notes from "../Entry/Notes";
import Metadata from "../Entry/Metadata";
import { trpc } from "../../utils/trpc";
import { useRouter } from "next/router";
import Spinner from "../Common/Spinner";
import PageAlert from "../Common/PageAlert";
import { XCircleIcon } from "@heroicons/react/24/solid";

const description = [
  "The page you are looking for does not exist.",
  "Please check the URL and try again.",
];

const EntryPage = () => {
  const [isShowReview, setIsShowReview] = useState<boolean>(false);
  const [isShowNotes, setIsShowNotes] = useState<boolean>(false);

  const router = useRouter();
  const { id } = router.query;

  const getEntry = trpc.useQuery([
    "entry.getEntry",
    {
      id: id as string,
    },
  ]);

  const updateReview = trpc.useMutation("entry.updateReview", {
    onSuccess: () => {
      refetch();
      document.dispatchEvent(new Event("visibilitychange"));
    },
  });

  const updateNote = trpc.useMutation("entry.updateNote", {
    onSuccess: () => {
      refetch();
      document.dispatchEvent(new Event("visibilitychange"));
    },
  });

  useEffect(() => {
    if (getEntry.isFetched) {
      setIsShowReview(
        getEntry?.data?.entry?.review && getEntry?.data?.entry?.review !== "" ? true : false,
      );
      setIsShowNotes(
        getEntry?.data?.entry?.note && getEntry?.data?.entry?.note !== "" ? true : false,
      );
    }
  }, [
    getEntry.isFetched,
    getEntry?.data?.entry?.review,
    getEntry?.data?.entry?.note,
    getEntry?.data?.entry?.rating,
  ]);

  if (getEntry.isLoading) {
    return <Spinner isGlobal={true} />;
  }

  if (getEntry.isSuccess && !getEntry.data) {
    return (
      <>
        <PageAlert
          elem={<p className="text-4xl font-extrabold text-red-600 sm:text-5xl">404</p>}
          title="Page not found"
          description={description}
          btnTitle="Go back to home"
        />
      </>
    );
  }

  if (getEntry.isError) {
    return (
      <PageAlert
        title="Something went wrong"
        elem={
          <h2 className="mb-10 flex justify-center">
            <XCircleIcon className="h-12 w-12 text-red-500" />
          </h2>
        }
        description={["There's a problem on our side. Please try again."]}
        btnTitle="Go back to home"
      />
    );
  }

  const refetch = () => {
    getEntry.refetch();
  };

  const triggerReview = () => {
    if (isShowReview) {
      setIsShowReview(!isShowReview);
      updateReview.mutateAsync({
        id: getEntry?.data?.entry?.id as string,
        review: "",
      });
    } else {
      setIsShowReview(!isShowReview);
    }
  };

  const triggerNotes = () => {
    if (isShowNotes) {
      setIsShowNotes(!isShowNotes);
      updateNote.mutateAsync({
        id: getEntry?.data?.entry?.id as string,
        note: "",
      });
    } else {
      setIsShowNotes(!isShowNotes);
    }
  };

  return (
    <div className="flex h-full justify-center">
      <div className="flex w-full flex-col">
        <EntryHeader
          boxId={getEntry?.data?.boxId}
          entryId={getEntry?.data?.entry?.id}
          entryTitle={getEntry?.data?.entry?.title}
          status={getEntry?.data?.entry?.status}
          refetch={refetch}
        />
        <Metadata
          entryId={getEntry?.data?.entry?.id}
          movieId={getEntry?.data?.entry?.movieId}
          triggerReview={triggerReview}
          triggerNotes={triggerNotes}
          isReviewed={getEntry?.data?.entry?.review ? true : false}
          isNoted={getEntry?.data?.entry?.note ? true : false}
          refetch={refetch}
          rating={getEntry?.data?.entry?.rating}
        />
        <div className="mx-auto flex w-full max-w-7xl flex-row">
          <div className="sm:ml-30 md:ml-50 mx-auto mb-6 flex max-w-7xl grow flex-col gap-3 pt-1 lg:ml-60 xl:ml-60">
            {isShowReview && (
              <Review
                review={getEntry?.data?.entry?.review ?? ""}
                refetch={refetch}
                entryId={getEntry?.data?.entry?.id}
              />
            )}

            {isShowNotes && (
              <Notes
                note={getEntry?.data?.entry?.note ?? ""}
                refetch={refetch}
                entryId={getEntry?.data?.entry?.id}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EntryPage;
