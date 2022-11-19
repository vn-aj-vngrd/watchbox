import { GetServerSidePropsContext } from "next";
import BoxPage from "../../components/Box/BoxPage";
import Meta from "../../components/Common/Meta";
import { getServerSideSession } from "../../utils/session";

const account = () => {
  return (
    <>
      <Meta title="WatchBox | Box" />
      <BoxPage />
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

  // const id = ctx?.params?.id;
  // const box = await prisma?.box?.findFirst({
  //   where: {
  //     id: id as string,
  //   },
  // });

  // if (!box) {
  //   return {
  //     notFound: true,
  //   };
  // }

  return {
    props: {},
  };
};

export default account;
