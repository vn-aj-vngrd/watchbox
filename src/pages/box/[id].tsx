import { XCircleIcon } from "@heroicons/react/24/solid";
import { GetServerSidePropsContext } from "next";
import BoxPage from "../../components/Box/BoxPage";
import Meta from "../../components/Common/Meta";
import PageAlert from "../../components/Common/PageAlert";
import Spinner from "../../components/Common/Spinner";
import { getServerSideSession } from "../../utils/session";
import { trpc } from "../../utils/trpc";

type Props = {
  id: string;
};

const account = ({ id }: Props) => {
  const getBox = trpc.useQuery(["box.getBox", { id }]);
  const getFavoriteBox = trpc.useQuery(["favorite.getFavoriteBox", { boxId: id }]);

  if (getBox.isLoading || getFavoriteBox.isLoading) {
    return <Spinner isGlobal={true} />;
  }

  if (getBox.isError || getFavoriteBox.isError) {
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
    getBox.refetch();
    getFavoriteBox.refetch();
  };

  return (
    <>
      <Meta title="WatchBox | Box" />
      <BoxPage box={getBox?.data} favoriteBox={getFavoriteBox?.data} id={id} refetch={refetch} />
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

  const id = ctx?.params?.id;
  const box = await prisma?.box?.findFirst({
    where: {
      id: id as string,
    },
  });

  if (!box) {
    return {
      notFound: true,
    };
  }

  return {
    props: { id },
  };
};

export default account;
