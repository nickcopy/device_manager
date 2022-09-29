import { Device } from "@prisma/client";
import type { NextPage } from "next";
import { Router, useRouter } from "next/router";
import { useEffect, useState } from "react";

import Layout from "../components/Layout";

const Setting: NextPage = () => {
  const router = useRouter();
  const [location, setLocation] = useState("");
  const [product, setproduct] = useState("");
  const [type, setType] = useState("");
  const [unit, setunit] = useState("");
  const [memo, setmemo] = useState("");
  const [errorMessage, seterrorMessage] = useState("");
  const [alldeviceData, setalldeviceData] = useState<Device[]>([]);
  function Clear() {
    setLocation("");
    setproduct("");
    setType("");
    setunit("");
    setmemo("");
    seterrorMessage("");
  }
  function 장비추가클릭() {
    document.querySelector("#container_add_device")?.classList.toggle("hidden");
    Clear();
  }
  ///<select>Change
  function 장치종류변경(event: React.ChangeEvent<HTMLSelectElement>) {
    setType(event.currentTarget.value);
  }
  //입력폼에 데이터 있는지 확인
  //Todo서버로 보넬 데이터
  function 장비등록() {
    if (!product) {
      seterrorMessage("장비를 입력하세요");
      return;
    }
    if (!location) {
      seterrorMessage("설치위치를 입력하세요");
      return;
    }
    if (!type) {
      seterrorMessage("장치종류을 선택해주세요");
      return;
    }
    if (!unit) {
      seterrorMessage("단위를 입력하세요");
      return;
    }
    seterrorMessage("");
    const data = {
      location,
      product,
      type,
      unit,
      memo,
      //전송완료시 입력창 초기화
      //오류있으면 표시
    };

    fetch("/api/device/add", {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.ok == true) {
          Clear();

          const tempArr = [...alldeviceData, json.newDevice];
        } else {
          seterrorMessage("등록에 실패했습니다");
        }
      });
  }
  function 장치삭제(장치ID: string) {
    if (!장치ID) return alert("없는 아이디 입니다");
    fetch(`/api/device/${장치ID}`, { method: "DELETE" })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        if (json.ok == true) {
          console.log(json.id);
          const tempArr = alldeviceData.filter(
            (device) => device.id !== json.id
          );
          setalldeviceData(tempArr);

          // router.reload();
        }
      });
    console.log(장치ID);
  }

  useEffect(() => {
    fetch("/api/device/all")
      .then((res) => res.json())
      .then((json) => setalldeviceData(json.alldevice));
  }, []);

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
              className="h-12 ring-2 ring-black text-gray-800 px-2"
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
            <span>장치종류 *</span>
            <select
              onChange={장치종류변경}
              className="h-12 ring-2 ring-black text-gray-800 px-2"
            >
              <option hidden>장치종류를 선택하세요</option>
              <option value="TEMP">온도센서</option>
              <option value="HUMI">습도센서</option>
              <option value="CO2">CO2센서</option>
            </select>
          </div>
          <div className=" flex flex-col">
            <span>단위*</span>
            <input
              type={"text"}
              value={unit}
              onChange={(event) => setunit(event.currentTarget.value)}
              placeholder="%"
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
              className="h-12 ring-2 ring-black text-gray-800 px-2"
            />
          </div>

          {errorMessage ? (
            <div id="errmessge" className="text-red-500 ">
              {errorMessage}
            </div>
          ) : null}

          <button onClick={장비등록} className="s_btn w-full py-4 font-bold">
            등록
          </button>
          <hr />
        </div>
        <div data-coment={"장비삭제메뉴"}>
          <h2 className="text-3xl font-bold">장치목록</h2>

          {0 < alldeviceData.length ? null : (
            <div className="text-center font-bold text-xl text-red-500">
              장치를 등록해주세요
            </div>
          )}
          <div>
            {alldeviceData.map((device, idx) => (
              <div key={idx} className="border-b-4 md-5 flex justify-between">
                <div>
                  <div>{device.id}</div>
                  <div>
                    ({device.type}) {device.product}-{device.location}
                  </div>
                  <div>{device.memo}</div>
                </div>
                <button
                  onClick={() => 장치삭제(device.id)}
                  className="text-red-500 bg-red-200 w-20 h-16 rounded-lg hover:bg-gray-500"
                >
                  삭제
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Setting;
