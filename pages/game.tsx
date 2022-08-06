import { NextPage } from "next";
import Head from "next/head";
import Layout from "components/common/Layout";
import Game from "components/game/Game";

const GamePage: NextPage = () => {
  return (
    <Layout>
      <Head>
        <meta name="description" content="Game japanese alphabet" />
      </Head>
      <Game />
    </Layout>
  );
};

export default GamePage;
