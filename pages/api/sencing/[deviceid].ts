import { Device } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import client from "../../../libs/server/client";

type Data = {
  ok: boolean;
  value?: number;
  error?: String;
};

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse<Data>
) {
  if (request.method != "GET" && request.method != "POST") {
    response.status(405).json({
      ok: false,
      error: `지원하지 않는 메서드 입니다${request.method}`,
    });
  }
  const { deviceid } = request.query;

  if (!deviceid) {
    return response.status(200).json({
      ok: false,
      error: `장치 아이디를 입력해주새요`,
    });
  }

  try {
    console.log("여기까지 출력됨");
    switch (request.method) {
      case "GET":
        const result = await client.sencing.findFirst({
          where: {
            deviceId: deviceid.toString(),
          },
          select: {
            //select는 필드를 선택할수 있음
            value: true,
          },
          orderBy: {
            //정렬
            createAt: "desc", //desc오름차순 asc내림차순
          },
        });
        console.log(result);
        response.status(200).json({ ok: true, value: result?.value });
        return;
      case "POST":
        const obj = JSON.parse(request.body);

        if (true === isNaN(obj.value)) {
          return response
            .status(500)
            .json({ ok: false, error: `숫자를 입력해주세요` });
        }
        const value = Number(obj.value);

        await client.sencing.create({
          data: { value: value, deviceId: deviceid.toString() },
        });
        response.status(200).json({ ok: true });
        return;
    }
  } catch (err) {
    response.status(200).json({ ok: false, error: `멸망.........${err}` });
  } finally {
    await client.$disconnect();
  }
}
