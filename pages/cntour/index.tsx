import { NextPage } from "next";
import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { parseString } from "xml2js";
const Home: NextPage = () => {
  interface Item {
    mng_no: String;
    local_nm: String;
    type: String;
    nm: String;
    nm_sub: String;
    addr: String;
    lat: String;
    lng: String;
    tel: String;
    h_url: String;
    desc: String;
    list_img: String;
  }
  interface Item_info {
    item: Item[];
  }
  interface Result {
    item_info: Item_info;
  }
  interface CntourListResponts {
    name: String;
    result?: Result;
  }
  const [totalCnt, settotalCnt] = useState(0);
  const [tours, setTour] = useState<Item[] | undefined>([]);
  const [pageNo, setpageNo] = useState(1);
  useEffect(() => {
    console.log("===== 관광명소 아이템 개수 로딩중....");
    fetch("/api/tour/cntour")
      .then((res) => res.json())
      .then((json) => {
        settotalCnt(json.totalCnt);
      });
  }, []);
  function 리스트() {
    console.log("===== 관광명소 리스트 로딩중....");
    fetch(`/api/tour/cntourList?start=${pageNo}&end=${pageNo + 4}`)
      .then((res) => res.json())
      .then((json: CntourListResponts) => {
        const 기존배열 = tours || [];
        const 신규배열 = json.result?.item_info.item || [];
        setTour([...기존배열, ...신규배열]);
        setpageNo(pageNo + 3);
      });
  }
  useEffect(() => {
    리스트();
  }, []);
  return (
    <Layout title="충남">
      <div className="p-4  space-y-6">충남 투어{totalCnt}</div>
      {tours?.map((ele, idx) => {
        return (
          <div
            key={idx}
            className="border-2 m-3 p-5 border-red-500 flex flex-col"
          >
            <div className="flex flex-col justify-center items-start font-bold ">
              <div>{ele.mng_no}</div>
              <div>{ele.nm}</div>
              <div>{ele.nm_sub}</div>
              <div>{ele.type}</div>

              <div>{ele.desc}</div>
              <div>
                lat:{ele.lat} ,lng:{ele.lng}
              </div>
              <div>{ele.list_img}</div>
              <hr />
            </div>
            <div className="text-center">{ele.addr}</div>
          </div>
        );
      })}
      <div>
        <button
          onClick={리스트}
          className="w-full bg-red-200 h-10 hover:bg-blue-300"
        >
          더보기({tours?.length}/{totalCnt})
        </button>
      </div>
      ;
    </Layout>
  );
};

export default Home;
