import { GetServerSidePropsContext } from "next";
import Meta from "../../components/Meta";
import { getServerSideSession } from "../../utils/session";

const index = () => {
  return (
    <>
      <Meta title="WatchBox | Account Settings" />
      <p className="text-center">Account Settings </p>
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
