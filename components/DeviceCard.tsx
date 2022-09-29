import { Device } from "@prisma/client";
import { NodejsRequestData } from "next/dist/server/web/types";
import { useEffect, useState } from "react";

interface DeviceCard {
  device: Device;
  realTime: Boolean;
}
export default function DeviceCard({ device, realTime }: DeviceCard) {
  const [value, setValue] = useState(0);
  const [timerid, setTimerid] = useState<NodeJS.Timer>();

  useEffect(() => {
    console.log(`${device.id}-${realTime}`);

    if (realTime) {
      const tempTimerid = setInterval(() => {
        sencingdataTime();
        console.log("실시간ON");
      }, 5000);
      setTimerid(tempTimerid);
    } else {
      clearTimeout(timerid);
    }
  }, [realTime]);

  useEffect(() => {
    sencingdataTime();
  }, []);
  function sencingdataTime() {
    fetch(`/api/sencing/${device.id}`)
      .then((res) => res.json())
      .then((json) => setValue(json.value));
  }
  return (
    <div
      data-coment="장비카드"
      className="m-3 bg-[#A7E2ED] dark:bg-[#313538] border-2 w-60 h-52 p-4 flex flex-col justify-between rounded-xl"
    >
      <div className=" flex justify-end items-end">
        <span className="text-5xl">{value ? value : "-"}</span>
        <span className="text-2xl text-gray-500">{device.unit}</span>
      </div>
      <div className=" flex flex-col">
        <span className="text-gray-500">{device.location}</span>
        <span className="text-3xl">{device.product}</span>
      </div>
    </div>
  );
}
