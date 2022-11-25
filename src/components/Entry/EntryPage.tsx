import { useState } from "react";
import EntryHeader from "../Entry/EntryHeader";
import Review from "../Entry/Review";
import Notes from "../Entry/Notes";
import Metadata from "../Entry/Metadata";
import { trpc } from "../../utils/trpc";
import { useRouter } from "next/router";
import Spinner from "../Common/Spinner";
import Meta from "../Common/Meta";
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

  if (getEntry.isLoading) {
    return <Spinner isGlobal={true} />;
  }

  if (getEntry.isSuccess && !getEntry.data) {
    return (
      <>
        <Meta title="Watchbox | 404" />
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
    setIsShowReview(!isShowReview);
  };

  const triggerNotes = () => {
    setIsShowNotes(!isShowNotes);
  };

  return (
    <div className="flex h-full w-full overflow-y-auto">
      <div className="flex h-full grow flex-col">
        <EntryHeader
          boxId={getEntry?.data?.boxId}
          entryId={getEntry?.data?.id}
          entryTitle={getEntry?.data?.entryTitle}
          status={getEntry?.data?.status}
          refetch={refetch}
        />
        <Metadata
          triggerReview={triggerReview}
          triggerNotes={triggerNotes}
          isReviewed={getEntry?.data?.review ? true : false}
          isNoted={getEntry?.data?.note ? true : false}
        />
        <div className="mx-auto flex w-full max-w-7xl flex-row">
          <div className="sm:ml-30 md:ml-50 mx-auto flex max-w-7xl grow flex-col px-4 pt-1 lg:ml-60 xl:ml-60">
            <hr />
            {isShowReview || getEntry?.data?.review ? (
              <Review
                review={getEntry?.data?.review}
                refetch={refetch}
                entryId={getEntry?.data?.id}
              />
            ) : null}
            <hr />
            {isShowNotes || getEntry?.data?.note ? (
              <Notes note={getEntry?.data?.note} refetch={refetch} entryId={getEntry?.data?.id} />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EntryPage;
