import { GetServerSidePropsContext } from "next";
import Settings from "../../components/Account/Settings";
import Meta from "../../components/Common/Meta";
import { getServerSideSession } from "../../utils/session";

const index = () => {
  return (
    <>
      <Meta title="Account Settings" />
      <Settings />
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

  if (session.user?.isNewUser === true) {
    return {
      redirect: {
        destination: "/auth/newuser",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default index;
