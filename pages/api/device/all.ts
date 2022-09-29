// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { Device } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import client from "../../../libs/server/client";

type Data = {
  ok: boolean;
  alldevice?: Device[];
  error?: String;
};

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse<Data>
) {
  if (request.method != "GET") {
    response.status(405).json({
      ok: false,
      error: `지원하지 않는 메서드 입니다${request.method}`,
    });
    return;
  }

  try {
    const alldevice = await client.device.findMany();

    response.status(200).json({ ok: true, alldevice });
  } catch (err) {
    response.status(200).json({ ok: false, error: `${err}` });
  }
}
