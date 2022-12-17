import { NextApiRequest, NextApiResponse } from "next";

//mock data
import data from "../../../mock/stageCollectionMock.json";

export default function ordered(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const response = {
      data: data,
    };

    return res.status(200).json(response);
  } else {
    //informando erro por método invalido
    res.setHeader("Allow", "GET");
    res.status(485).end("Method not allowed");
  }
}
