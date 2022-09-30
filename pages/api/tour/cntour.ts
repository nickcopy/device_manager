// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { parseString } from "xml2js";
type Data = {
  name: string;
  totalCnt?: number;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    console.log("===== 관광명소 아이템 개수 로딩중....");
    fetch("http://tour.chungnam.go.kr/_prog/openapi/?func=tour&mode=getCnt")
      .then((res) => res.text())
      .then((xmlstr) => {
        parseString(xmlstr, { explicitArray: false }, function (err, obj) {
          const totalCnt = obj.item_info.item.totalCnt;
          console.log(totalCnt);
          res.status(200).json({ name: "John Doe111111", totalCnt });
          //   console.log(JSON.stringify(obj));
        });
      });
  } catch {
    res.status(200).json({ name: "멸망........." });
  }
}
