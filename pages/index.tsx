import type { NextPage } from "next";
import Counter from "../components/Counter";
const Home: NextPage = () => {
  return (
    <div>
      hello
      <Counter aboutName={"이진우"} startDate={20220926} />
    </div>
  );
};

export default Home;
