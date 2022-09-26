import { User } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import client from "../../libs/server/client";

// type Data = {
//   name: string;
// };
interface ResqonseDataType {
  name: String;
  users: User[];
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResqonseDataType>
) {
  try {
    const users = await client.user.findMany();
    console.log(users);
    res.status(200).json({ name: "okokok", users });
  } catch (err) {}
}
