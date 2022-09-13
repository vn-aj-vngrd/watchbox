// src/auth/signin.tsx

import type { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import SigninForm from "../../components/SigninForm";

const signin = () => {
  return <SigninForm />;
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
