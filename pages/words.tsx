import { NextPage } from "next";
import Head from "next/head";
import Layout from "components/common/Layout";
import { useEffect, useState } from "react";
import axios from "axios";
import Word from "types/word";

const WordsPage: NextPage = () => {
  const [words, setWords] = useState<Word[]>([]);

  useEffect(() => {
    const getWords = async () => {
      const response = await axios<{ words: Word[] }>("/api/words");
      const { words } = response.data;
      setWords(words);
    };

    getWords();
  }, []);

  console.log(words);

  return (
    <Layout>
      <Head>
        <meta name="description" content="Japanese words" />
      </Head>
    </Layout>
  );
};

export default WordsPage;
