// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Device } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import client from "../../../libs/server/client";
type Data = {
  ok: boolean;
  newDevice?: Device;
  error?: String;
};

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse<Data>
) {
  //405 allow method check
  if (request.method != "POST") {
    response.status(405).json({
      ok: false,
      error: `지원하지 않는 메서드 입니다${request.method}`,
    });
    return;
  }
  //   const {
  //     body: { location, product, type, unit, memo },
  //   } = request;

  const { product, location, type, unit, memo } = JSON.parse(request.body);
  console.log(product, location, type, unit, memo);
  //입력필드 검증
  if (true) {
    if (!product) {
      return response
        .status(200)
        .json({ ok: false, error: "제품명이 없습니다" });
    }
    if (!location) {
      return response
        .status(200)
        .json({ ok: false, error: "설치위치가 없습니다" });
    }
    if (!type) {
      return response.status(200).json({ ok: false, error: "type이 없습니다" });
    }
    if (!unit) {
      return response.status(200).json({ ok: false, error: "unit이 없습니다" });
    }
  }
  try {
    const newDevice = await client.device.create({
      data: {
        product,
        location,
        type,
        unit,
        memo,
      },
    });

    response.status(200).json({ ok: true, newDevice });
  } catch (err) {
    response.status(200).json({ ok: false, error: `${err}` });
  }
}
