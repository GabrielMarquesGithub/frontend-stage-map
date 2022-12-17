import { NextApiRequest, NextApiResponse } from "next";

//mock data
import data from "../../../mock/orderedCollectionMock.json";

export default function ordered(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const itemsPerPage = 11;
    let pageIndex;
    const { page } = req.query;
    pageIndex = page ? page : "1";
    pageIndex = Number(pageIndex);

    const response = {
      data: data.slice(
        (pageIndex - 1) * itemsPerPage,
        pageIndex * itemsPerPage
      ),
      meta: {
        total: data.length,
      },
    };

    return res.status(200).json(response);
  } else {
    //informando erro por método invalido
    res.setHeader("Allow", "GET");
    res.status(485).end("Method not allowed");
  }
}
