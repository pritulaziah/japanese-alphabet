import { NextPage } from "next";
import Head from "next/head";
import Layout from "components/common/Layout";
import { useEffect, useState } from "react";
import axios from "axios";
import { IWord } from "types/word";
import WordsTable from "components/words/WordsTable";

const WordsPage: NextPage = () => {
  const [words, setWords] = useState<IWord[]>([]);

  useEffect(() => {
    const getWords = async () => {
      try {
        const response = await axios<{ words: IWord[] }>("/api/words");
        const { words } = response.data;
        setWords(words);
      } catch (error) {
        // nothing
      }
    };

    getWords();
  }, []);

  return (
    <Layout>
      <Head>
        <meta name="description" content="Japanese words" />
      </Head>
      <WordsTable data={words} />
    </Layout>
  );
};

export default WordsPage;
