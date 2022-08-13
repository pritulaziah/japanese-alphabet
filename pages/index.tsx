import { NextPage } from "next";
import Head from "next/head";
import Layout from "components/common/Layout";
import Table from "components/alphabet/Table";
import Settings from "components/alphabet/Settings";

const AlphabetPage: NextPage = () => {
  return (
    <Layout>
      <Head>
        <meta name="description" content="Learn japanese alphabet" />
      </Head>
      <div className="flex flex-1">
        <Table />
        <Settings />
      </div>
    </Layout>
  );
};

export default AlphabetPage;
