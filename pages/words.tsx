import { NextPage } from "next";
import Head from "next/head";
import Layout from "components/common/Layout";
import { useEffect, useState } from "react";
import axios from "axios";
import { IWord } from "types/word";

const WordsPage: NextPage = () => {
  const [words, setWords] = useState<IWord[]>([]);

  useEffect(() => {
    const getWords = async () => {
      const response = await axios<{ words: IWord[] }>("/api/words");
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
      <ul>
        {words.map((word) => (
          <li className="inline-flex items-center mb-1" key={word._id}>
            <div className="font-semibold text-xl font-japanese" lang="ja">
              {word.japanese}
            </div>
            <span className="w-5 h-5 -mb-1 text-neutral-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M16.01 11H4v2h12.01v3L20 12l-3.99-4z" />
              </svg>
            </span>
            <div className="text-xl">{word.meaning}</div>
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export default WordsPage;
