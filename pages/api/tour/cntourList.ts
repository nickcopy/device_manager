// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { parseString } from "xml2js";
type Data = {
  name: string;
  result?: any;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log("===== 관광명소 아이템 개수 로딩중....");
  try {
    console.log(req.query);
    let { start, end } = req.query;
    if (!start) {
      start = "1";
      end = "5";
    } else {
      if (!end) {
        end = (Number(start) + 4).toString();
      }
    }
    if (Number(start) + 4 < Number(end)) {
      end = (Number(start) + 4).toString();
    }
    if (Number(start) >= Number(end)) {
      end = (Number(start) + 4).toString();
    }
    console.log(`start${start} / end${end}`);

    fetch(
      `http://tour.chungnam.go.kr/_prog/openapi/?func=tour&start=${start}&end=${end}`
    )
      .then((res) => res.text())
      .then((xmlstr) => {
        parseString(xmlstr, { explicitArray: false }, function (err, obj) {
          console.log(obj);
          //   const totalCnt = obj.item_info.item.totalCnt;
          res.status(200).json({ name: "John Doe111111", result: obj });
          //   console.log(JSON.stringify(obj));
        });
      });
  } catch {
    res.status(200).json({ name: "멸망........." });
  }
}
