// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { User } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import client from "../../../../libs/server/client";
type Data = {
  ok: boolean;
  deletedId?: String;
  user?: User;
  err?: String;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    if (req.method !== "POST") {
      return res
        .status(405)
        .json({ ok: false, err: "지원하지 않는 메서드 입니다" });
    }
    // console.log(req.body);
    const obj = JSON.parse(req.body);
    console.log(req.query.id);
    // console.log(obj.name);

    if (!obj.name) {
      res.status(200).json({ ok: false, err: "이름을 입력하세요" });
    }
    const updateUser = await client.user.update({
      where: {
        id: req.query.id?.toString(),
      },
      data: {
        name: obj.name,
      },
    });

    res.status(200).json({ ok: true });
  } catch (err) {
    res.status(200).json({ ok: false, err: `${err}` });
  }
}
