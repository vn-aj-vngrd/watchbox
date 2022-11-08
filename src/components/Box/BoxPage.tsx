import { Box, FavoriteBox } from "@prisma/client";
import { useState, useEffect } from "react";
import Canvas from "./Canvas";
import Components from "./Components";
import Controls from "./Controls";
import Header from "./Header";
// import { env } from "../../env/client.mjs";

type Props = {
  box: Box | null | undefined;
  favoriteBox: FavoriteBox | null | undefined;
  id: string;
};

const BoxPage = ({ box, favoriteBox, id }: Props) => {
  const [sidePanel, setSidePanel] = useState(true);

  const searchMovies = async () => {
    const req = await fetch(
      // `https://api.themoviedb.org/3/search/movie?api_key=${env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}&language=en-US&query=${title}&page=1&include_adult=true`,
      `https://api.themoviedb.org/3/search/movie?api_key=277c82ee75f3f4e8dff6d431ca696ec2&language=en-US&query=Iron%20Man&page=1&include_adult=true`,
      {
        method: "GET",
      },
    ).then((res) => res.json());

    const { results } = req;
    console.log(results);
  };

  useEffect(() => {
    searchMovies();
  });

  return (
    <div className="flex h-full w-full border-t border-b dark:border-darkColor">
      <div
        className={`flex h-full w-12 flex-col border-r transition-all ease-in-out dark:border-darkColor ${
          !sidePanel ? "md:w-12" : "md:w-72"
        }`}
      >
        <Controls sidePanel={sidePanel} setSidePanel={setSidePanel} />
        <Components sidePanel={sidePanel} />
      </div>
      <div className="flex h-full grow flex-col">
        <Header boxTitle={box?.boxTitle} favoriteBox={favoriteBox} id={id} />
        <Canvas />
      </div>
    </div>
  );
};

export default BoxPage;
