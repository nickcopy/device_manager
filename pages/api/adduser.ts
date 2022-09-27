// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { User } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import client from "../../libs/server/client";
type Data = {
  ok: boolean;
  user?: User;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const user = await client.user.create({
      data: { name: "콩순이", age: 5, addr: "인터넷" },
    });
    console.log(user);

    res.status(200).json({ ok: true, user });
  } catch (err) {
    res.status(200).json({ ok: false });
  }
}
