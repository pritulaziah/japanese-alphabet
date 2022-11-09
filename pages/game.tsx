import { NextPage } from "next";
import Head from "next/head";
import Layout from "components/common/Layout";
import { AlphabetTypes } from "types/alphabet";
import Game from "components/game/Game";
import StoreProvider from "providers/StoreProvider";

const GamePage: NextPage = () => {
  return (
    <StoreProvider initialTypes={[AlphabetTypes.Gojuuon]}>
      <Layout>
        <Head>
          <meta name="description" content="Japanese alphabet game" />
        </Head>
        <Game />
      </Layout>
    </StoreProvider>
  );
};

export default GamePage;
