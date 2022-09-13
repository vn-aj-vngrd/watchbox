// src/auth/signin.tsx

import type { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import Meta from "../../components/Meta";
import SigninForm from "../../components/SigninForm";

const signin = () => {
  return (
    <>
      <Meta title="Watchbox - Sign In" />
      <SigninForm />
    </>
  );
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
