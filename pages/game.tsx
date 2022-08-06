import { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import Button from "components/common/Button";
import Play from "components/Play";
import Layout from "components/common/Layout";

const Game: NextPage = () => {
  const [startGame, setStartGame] = useState(false);

  const finishGame = () => {
    setStartGame(false);
  };

  return (
    <Layout>
      <Head>
        <meta name="description" content="Game japanese alphabet" />
      </Head>
      <div className="flex flex-col justify-center items-center flex-1">
        {startGame ? (
          <Play finishGame={finishGame} />
        ) : (
          <Button onClick={() => setStartGame(true)}>Start game</Button>
        )}
      </div>
    </Layout>
  );
};

export default Game;
