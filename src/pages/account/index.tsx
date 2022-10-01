import { GetServerSidePropsContext } from "next";
import Meta from "../../components/Meta";
import { getServerSideSession } from "../../utils/session";

const index = () => {
  return (
    <>
      <Meta title="WatchBox | Account Settings" />
      <p className="text-center text-2xl font-bold my-5">Account Settings</p>
      <div className="block mx-auto w-1/2 dark:bg-darkerColor border border-neutral-400 rounded-lg">
        <div className="p-8">
          <div>
            <div className="block bg-darkColor border border-neutral-900 w-50 mx-auto rounded-full" style={{ width: '10vw' , height: '10vw'}}></div>
            <form className="w-full">
              <label htmlFor="username" className="block mb-2 text-lg font-semibold text-neutral-900">First name</label>
              <input type="text" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
              <button type="submit" className="block w-full mt-4 bg-blue-600 hover:bg-blue-800 text-white py-2.5 rounded-lg">Update Account</button>
              <button type="submit" className="block w-full mt-4 bg-red-600 hover:bg-red-700 text-white py-2.5 rounded-lg">Delete Account</button>
            </form>
          </div>
        </div>
      </div>
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
