// src/auth/newuser.tsx

import { GetServerSidePropsContext } from "next";
import { Session } from "next-auth";
import Welcome from "../../components/Auth/Welcome";
import Meta from "../../components/Common/Meta";
import { getServerSideSession } from "../../utils/session";

const newuser = () => {
  return (
    <>
      <Meta title="Welcome" />
      <Welcome />
    </>
  );
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  if (ctx) {
    const session: Session | null = await getServerSideSession(ctx);

    if (!session || session?.user?.isNewUser === false) {
      return {
        notFound: true,
      };
    }
  }

  return {
    props: {},
  };
};

export default newuser;
