import { Device } from "@prisma/client";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import Layout from "../components/Layout";

const Data: NextPage = () => {
  const [getDievice, setGetDevice] = useState<Device[]>([]);
  const [getId, setGetId] = useState("");
  const [value, setValue] = useState("");
  const router = useRouter();
  function 값변경(event: React.ChangeEvent<HTMLInputElement>) {
    const inputStr: string = event.currentTarget.value;
    if (!Number.parseInt(inputStr)) return;
    setValue(inputStr);
  }
  function deviceIDselect(event: React.ChangeEvent<HTMLSelectElement>) {
    setGetId(event.currentTarget.value);
  }
  function 값등록() {
    const data = {
      value,
    };

    fetch(`/api/sencing/${getId}`, {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.ok === "ok") {
          router.reload;
        }
      });
  }

  useEffect(() => {
    fetch("/api/device/all")
      .then((res) => res.json())
      .then((json) => setGetDevice(json.alldevice));
  }, []);

  return (
    <Layout title="data">
      <div className="p-4  space-y-6">
        {" "}
        <h2 className="text-3xl font-bold mb-4 ">Select Device</h2>
        {0 < getDievice.length ? (
          <div>
            <select
              onChange={deviceIDselect}
              className="h-12  w-full ring-2 space-y-6 ring-black text-gray-800 px-2"
            >
              <option hidden>장비을 선택해주세요</option>
              {getDievice.map((device, idx) => (
                <option key={idx} value={device.id}>
                  {device.type}
                  {device.location}
                </option>
              ))}
            </select>
            <div className="font-bold my-8">장비ID : {getId}</div>
            <div className="flex flex-col">
              {" "}
              <div className="font-bold  my-1">value</div>
              <input
                value={value}
                onChange={값변경}
                type={"text"}
                placeholder="........"
                className="h-8  w-full ring-1 ring-black my-2 text-gray-800 px-2"
              />
              <button
                onClick={값등록}
                className="s_btn my-2 h-12 text-l font-bold"
              >
                등록
              </button>
            </div>
          </div>
        ) : (
          <div>등록된 장비가 없습니다</div>
        )}
      </div>
    </Layout>
  );
};

export default Data;
