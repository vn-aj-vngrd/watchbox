import { GetServerSidePropsContext } from "next";
import { getServerSideSession } from "../../../utils/session";
import Meta from "../../../components/Common/Meta";
import EntryPage from "../../../components/Entry/EntryPage";

const entry = () => {
  return (
    <>
      <Meta title="WatchBox | Entry" />
      <EntryPage />
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

export default entry;
