import type { NextPage } from "next";
import Link from "next/link";
import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import { Device } from "@prisma/client";
import DeviceCard from "../components/DeviceCard";
import Toggle from "react-toggle";
import { ClimbingBoxLoader } from "react-spinners";
const Home: NextPage = () => {
  const [devices, setDevices] = useState<Device[]>([]);
  const [bToggle, setbToggle] = useState(true);
  useEffect(() => {
    fetch("/api/device/all")
      .then((res) => res.json())
      .then((json) => setDevices(json.alldevice));
  }, []);
  function 토글변경() {
    setbToggle(!bToggle);
    console.log(`토글변경됨-${!bToggle}`);
    if (!bToggle) {
      console.log("실시간온");
    } else {
    }
    console.log("실시간OFF");
  }
  return (
    <Layout title="HEME">
      <div className="h-full   p-8 space-y-7">
        <div id="웰컴메시지" className="flex justify-between items-center">
          <div>
            <div className="text-4xl">Hello LJW</div>
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
          <div className="select-none flex items-center space-x-2">
            {bToggle && <ClimbingBoxLoader color="#36d7b7" size={20} />}
            <Toggle
              id="cheese-status"
              defaultChecked={bToggle}
              onChange={토글변경}
            />
            <label htmlFor="cheese-status">
              실시간 <span>{bToggle ? "ON" : "OFF"}</span>
            </label>
          </div>
        </div>
        <div id="쎈서들" className="flex flex-wrap ">
          {0 < devices.length ? null : <div>디바이스가 없습니다</div>}
          {devices.map((device, idx) => (
            <DeviceCard
              key={idx}
              device={device}
              realTime={bToggle}
            ></DeviceCard>
          ))}
        </div>
      </div>
      <div>ssss</div>
    </Layout>
  );
};

export default Home;
