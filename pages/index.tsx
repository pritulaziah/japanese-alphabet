import { NextPage } from "next";
import Head from "next/head";
import Layout from "components/common/Layout";
import Table from "components/alphabet/Table";
import Sidebar from "components/alphabet/Sidebar";

const AlphabetPage: NextPage = () => {
  return (
    <Layout>
      <Head>
        <meta name="description" content="Learn japanese alphabet" />
      </Head>
      <Table />
      <Sidebar />
    </Layout>
  );
};

export default AlphabetPage;
