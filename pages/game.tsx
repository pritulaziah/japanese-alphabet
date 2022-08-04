import { NextPage } from "next";
import Head from "next/head";
import Navigation from "components/Navigation";

const Game: NextPage = () => {
  return (
    <div className="flex">
      <Head>
        <meta name="description" content="Game japanese alphabet" />
      </Head>
      <Navigation />
    </div>
  );
};

export default Game;
