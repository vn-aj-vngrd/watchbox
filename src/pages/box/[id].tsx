import { GetServerSidePropsContext } from "next";
import BoxPage from "../../components/Box/BoxPage";
import Meta from "../../components/Common/Meta";
import { getServerSideSession } from "../../utils/session";
import { trpc } from "../../utils/trpc";

type Props = {
  id: string;
};

const account = ({ id }: Props) => {
  const getBox = trpc.useQuery(["box.getBox", { id }]);
  const getFavoriteBox = trpc.useQuery(["favorite.getFavoriteBox", { boxId: id }]);

  return (
    <>
      <Meta title="WatchBox | Box" />
      <BoxPage box={getBox?.data} favoriteBox={getFavoriteBox?.data} id={id} />
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

  return {
    props: { id },
  };
};

export default account;
