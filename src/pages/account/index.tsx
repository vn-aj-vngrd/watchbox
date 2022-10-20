import { GetServerSidePropsContext } from "next";
import Meta from "../../components/Common/Meta";
import Settings from "../../components/Account/Settings";
import { getServerSideSession } from "../../utils/session";

const index = () => {
  return (
    <>
      <Meta title="WatchBox | Account Settings" />
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

  return {
    props: {},
  };
};

export default index;
