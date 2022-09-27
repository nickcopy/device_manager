import type { NextPage } from "next";
import Link from "next/link";
import setting from "./setting";
import Layout from "../components/Layout";

const Home: NextPage = () => {
  return (
    <Layout title="HEME">
      <div className="h-full   p-8 space-y-7">
        <div id="웰컴메시지" className="flex justify-between items-center">
          <div>
            <div className="text-4xl">Hello kss</div>
            <div className="text-gray-500">wellcome back to home</div>
          </div>
          <div>
            <Link href={"/setting"}>
              <button className=" space-x-2 s_btn py-4 px-5 rounded-lg flex">
                <span data-coment={"+아이콘"}>Add Divese</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm14.024-.983a1.125 1.125 0 010 1.966l-5.603 3.113A1.125 1.125 0 019 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </Link>
          </div>
        </div>
        <div id="d링크드투유 " className="flex justify-between items-center">
          <div className="text-3xl font-bold">Linked to you</div>
          <div></div>
        </div>
        <div id="쎈서들" className="flex flex-wrap ">
          {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((devise, idx) => (
            <div
              key={idx}
              data-coment="장비카드"
              className="m-3 bg-[#A7E2ED] dark:bg-[#313538] border-2 w-60 h-52 p-4 flex flex-col justify-between rounded-xl"
            >
              <div className=" flex justify-end items-end">
                <span className="text-5xl">25</span>
                <span className="text-2xl text-gray-500">%</span>
              </div>
              <div className=" flex flex-col">
                <span className="text-gray-500">
                  안방-메모메모메모ㅍ메모메모
                </span>
                <span className="text-2xl">샤오미 공기청정기</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Home;
