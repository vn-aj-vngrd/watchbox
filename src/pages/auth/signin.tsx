// src/auth/signin.tsx

import type { GetServerSidePropsContext } from "next";
import Meta from "../../components/Common/Meta";
import SigninForm from "../../components/Auth/SigninForm";
import { getServerSideSession } from "../../utils/session";

const signin = () => {
  return (
    <>
      <Meta title="Sign In | WatchBox" />
      <SigninForm />
    </>
  );
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await getServerSideSession(ctx);

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
