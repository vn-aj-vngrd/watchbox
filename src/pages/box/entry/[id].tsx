import { GetServerSidePropsContext } from "next";
import { getServerSideSession } from "../../../utils/session";
import Meta from "../../../components/Common/Meta";
import EntryPage from "../../../components/Entry/EntryPage";

const entry = (/*{ id }: Props*/) => {
  // const getBox = trpc.useQuery(["box.getBox", { id }]);
  // const getFavoriteBox = trpc.useQuery(["favorite.getFavoriteBox", { boxId: id }]);

  // if (getBox.isLoading || getFavoriteBox.isLoading) {
  // return <Spinner isGlobal={true} />;
  // }

  // if (getBox.isError || getFavoriteBox.isError) {
  // return (
  //   <PageAlert
  //     title="Something went wrong"
  //     elem={
  //       <h2 className="mb-10 flex justify-center">
  //         <XCircleIcon className="h-12 w-12 text-red-500" />
  //       </h2>
  //     }
  //     description={["There's a problem on our side. Please try again."]}
  //     btnTitle="Go back to home"
  //   />
  // );
  // }

  // const refetch = () => {
  //   getBox.refetch();
  //   getFavoriteBox.refetch();
  // };

  return (
    <>
      <Meta title="WatchBox | Entry" />
      <EntryPage />
    </>
  );
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await getServerSideSession(ctx);

  if (!session) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default entry;
