import { NextPage } from "next";
import Head from "next/head";
import Layout from "components/common/Layout";
import Table from "components/alphabet/Table";
import Settings from "components/alphabet/Settings";
import StoreProvider from "providers/StoreProvider";

const IndexPage: NextPage = () => {
  return (
    <StoreProvider>
      <Layout>
        <Head>
          <meta name="description" content="Learn japanese alphabet" />
        </Head>
        <div className="flex flex-1">
          <Table />
          <Settings />
        </div>
      </Layout>
    </StoreProvider>
  );
};

export default IndexPage;
