import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Layout from "components/common/Layout";
import { ParsedUrlQuery } from "querystring";
import Words from "components/words/Words";

interface IProps {
  defaultQuery: ParsedUrlQuery;
}

const WordsPage: NextPage<IProps> = ({ defaultQuery }) => {
  return (
    <Layout>
      <Head>
        <meta name="description" content="Japanese words" />
      </Head>
      <Words query={defaultQuery} />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps<IProps> = async (
  context
) => {
  return {
    props: { defaultQuery: context.query },
  };
};

export default WordsPage;
