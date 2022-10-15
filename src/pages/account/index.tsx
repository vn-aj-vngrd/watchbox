import { GetServerSidePropsContext } from "next";
import Meta from "../../components/Meta";
import Profile from "../../components/Profile";
import { getServerSideSession } from "../../utils/session";

const index = () => {
  return (
    <>
      <Meta title="WatchBox | Account Settings" />
      <Profile />
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

export default index;
