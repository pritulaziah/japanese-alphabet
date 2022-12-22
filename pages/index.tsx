import { NextPage } from "next";
import Head from "next/head";
import Layout from "components/common/Layout";
import Alphabet from "components/alphabet";

const IndexPage: NextPage = () => {
  return (
    <Layout>
      <Head>
        <meta name="description" content="Learn japanese alphabet" />
      </Head>
      <Alphabet />
    </Layout>
  );
};

export default IndexPage;
