// src/auth/newuser.tsx

import Welcome from "../../components/Welcome";
import { GetServerSidePropsContext } from "next";
import { Session } from "next-auth";
import { getServerSideSession } from "../../utils/session";

const newuser = () => {
  return <Welcome />;
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  if (ctx) {
    const session: Session | null = await getServerSideSession(ctx);

    if (session?.user?.isNewUser === false) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }

    if (!session) {
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
