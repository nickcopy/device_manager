import { NextPage } from "next";
import { useEffect, useReducer, useState } from "react";
import Layout from "../../components/Layout";
import { parseString } from "xml2js";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const router = useRouter();
  const [mng_no, setMng_no] = useState("");

  useEffect(() => {
    setMng_no(router.query.mng_no?.toString() || "");
  }, [router.query]);

  return (
    <Layout title={"에러"}>
      <h1>{mng_no}</h1>
    </Layout>
  );
};

export default Home;
