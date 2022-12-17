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
import { Prisma, Entry } from "@prisma/client";

type Component = Prisma.ComponentGetPayload<{
  include: { entry: true };
}>;

const description = [
  "The page you are looking for does not exist.",
  "Please check the URL and try again.",
];

const EntryPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [entryComponent, setEntryComponent] = useState<Component>();
  const entry = entryComponent?.entry as Entry;

  const getEntry = trpc.useQuery(["entry.getEntry", { id: id as string }]);
  const updateReview = trpc.useMutation("entry.updateReview");
  const updateNote = trpc.useMutation("entry.updateNote");

  useEffect(() => {
    if (getEntry.data && getEntry.isSuccess) {
      setEntryComponent(getEntry.data);
    }
  }, [getEntry.isSuccess, getEntry.data]);

  if (getEntry.isLoading) {
    return <Spinner isGlobal={true} />;
  }

  if (getEntry.isSuccess && !getEntry.data) {
    return (
      <PageAlert
        elem={<p className="text-4xl font-extrabold text-red-600 sm:text-5xl">404</p>}
        title="Page not found"
        description={description}
        btnTitle="Go back to home"
      />
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

  return (
    <div className="flex h-full justify-center">
      <div className="flex w-full flex-col">
        <EntryHeader
          boxId={entryComponent?.boxId}
          id={entry?.id}
          title={entry?.title}
          status={entry?.status}
        />
        <Metadata
          entryId={entry?.id}
          movieId={entry?.movieId}
          review={entry?.review}
          note={entry?.note}
          rating={entry?.rating}
        />
        <div className="mx-auto flex w-full max-w-7xl flex-row">
          <div className="sm:ml-30 md:ml-50 mx-auto mb-6 flex max-w-7xl grow flex-col gap-3 pt-1 lg:ml-60 xl:ml-60">
            <Review entryId={entry?.id} review={entry?.review} />
            <Notes entryId={entry?.id} note={entry?.note} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EntryPage;
