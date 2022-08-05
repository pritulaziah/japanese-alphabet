import { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import Navigation from "components/Navigation";
import Button from "components/common/Button";
import Play from "components/Play";

const Game: NextPage = () => {
  const [startGame, setStartGame] = useState(false);

  const finishGame = () => {
    setStartGame(false);
  };

  return (
    <div className="flex">
      <Head>
        <meta name="description" content="Game japanese alphabet" />
      </Head>
      <Navigation />
      <div className="flex flex-col justify-center items-center flex-1">
        {startGame ? (
          <Play finishGame={finishGame} />
        ) : (
          <Button onClick={() => setStartGame(true)}>Start game</Button>
        )}
      </div>
    </div>
  );
};

export default Game;
