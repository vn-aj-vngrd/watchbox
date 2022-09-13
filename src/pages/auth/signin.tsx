import type { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import Login from "../../components/Login";

const signin = () => {
  return <Login />;
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await getSession(ctx);

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default signin;
