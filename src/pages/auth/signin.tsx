// src/auth/signin.tsx

import type { GetServerSidePropsContext } from "next";
import Meta from "../../components/Meta";
import SigninForm from "../../components/SigninForm";
import { getServerSideSession } from "../../utils/session";

const signin = () => {
  return (
    <>
      <Meta title="Watchbox | Sign In" />
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
