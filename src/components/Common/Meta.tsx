// components/Meta.tsx

import Head from "next/head";

type Props = {
  title?: string;
};

const Meta = ({ title }: Props) => {
  return (
    <Head>
      <title> {title} </title>
      <meta charSet="utf-8" />
      <meta content="width=device-width, initial-scale=1.0" name="viewport" />
      <meta name="title" content="WatchBox" />
      <meta
        name="description"
        content="WatchBox is an open-source utility web application that allows users to keep track of and record their viewing history for movies and television shows."
      />
      <meta name="keywords" content="WatchBox, Movie Tracker, Movie Notes, Movie Manager" />
      <meta name="robots" content="index, follow" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="1 days" />
      <meta name="author" content="NextDevs" />
      <link rel="icon" href="/favicon.ico" />
      <link rel="manifest" href="/manifest.json" />
      <link rel="image_src" href="/favicon/android-chrome-512x512.png" />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="WatchBox" />
      <meta
        property="og:description"
        content="WatchBox is an open-source utility web application that allows users to keep track of and record their viewing history for movies and television shows."
      />
      <meta property="og:title" content="WatchBox" />
      <meta property="og:image" content="/favicon/android-chrome-512x512.png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="627" />
    </Head>
  );
};

export default Meta;
