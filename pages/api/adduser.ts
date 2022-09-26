// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import client from "../../libs/server/client";
type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const Newuser = await client.user.create({
      data: { name: "콩순이", age: 5, addr: "인터넷" },
    });
    res.status(200).json({ name: "okokokokoko" });
  } catch (err) {
    res.status(200).json({ name: "ngngngngngng" });
  }
}
