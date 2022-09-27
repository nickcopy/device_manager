import type { NextPage } from "next";
import { useState } from "react";

import Layout from "../components/Layout";

const setting: NextPage = () => {
  const [location, setLocation] = useState("");
  const [product, setproduct] = useState("");
  const [unit, setunit] = useState("");
  const [memo, setmemo] = useState("");

  function 장비추가클릭() {
    document.querySelector("#container_add_device")?.classList.toggle("hidden");
    setLocation("");
    setproduct("");
    setunit("");
    setmemo("");
  }
  return (
    <Layout title="setting">
      <div className="p-6 space-y-6">
        <div data-coment={"장비추가번튼"} className="flex justify-end ">
          <div>
            <button
              onClick={장비추가클릭}
              className=" space-x-2 s_btn py-4 px-5 rounded-lg flex"
            >
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
          </div>
        </div>
        <div
          id="container_add_device"
          data-coment={"new Devise"}
          className="space-y-5 hidden"
        >
          <hr />
          <div className="text-3xl font-bold">new Devise</div>
          <div className=" flex flex-col">
            <span>제품명*</span>
            <input
              type={"text"}
              value={product}
              onChange={(event) => setproduct(event.currentTarget.value)}
              placeholder="삼성,LG"
              className="h-12 ring-2 ring-black text=gray-800 px-2"
            />
          </div>
          <div className=" flex flex-col">
            <span>설치위치 *</span>
            <input
              type={"text"}
              value={location}
              onChange={(event) => setLocation(event.currentTarget.value)}
              placeholder="거실,안방.......etc"
              className="h-12 ring-2 ring-black text=gray-800 px-2"
            />
          </div>
          <div className=" flex flex-col">
            <span>단위 *</span>
            <input
              type={"text"}
              value={unit}
              onChange={(event) => setunit(event.currentTarget.value)}
              placeholder="거실,안방.......etc"
              className="h-12 ring-2 ring-black text=gray-800 px-2"
            />
          </div>
          <div className=" flex flex-col">
            <span>메모 </span>
            <input
              type={"text"}
              value={memo}
              onChange={(event) => setmemo(event.currentTarget.value)}
              placeholder="........"
              className="h-12 ring-2 ring-black text=gray-800 px-2"
            />
          </div>
          <button className="s_btn w-full py-4 font-bold">등록</button>
          <hr />
        </div>
      </div>
    </Layout>
  );
};

export default setting;
