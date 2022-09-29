// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Device } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import client from "../../../libs/server/client";
type Data = {
  ok: boolean;
  id?: string;
  error?: String;
};

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse<Data>
) {
  //405 allow method check
  if (request.method != "DELETE") {
    response.status(405).json({
      ok: false,
      error: `지원하지 않는 메서드 입니다${request.method}`,
    });
    return;
  }

  //   const {
  //     body: { location, product, type, unit, memo },
  //   } = request;

  try {
    const { deviceid } = request.query;

    const deleteDevice = await client.device.delete({
      where: {
        id: deviceid?.toString(),
      },
    });
    console.log(deleteDevice);
    response.status(200).json({ ok: true, id: deleteDevice.id });
  } catch (err) {
    response.status(200).json({ ok: false, error: `${err}` });
  }
}
