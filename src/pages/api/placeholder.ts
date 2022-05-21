import { NextApiRequest, NextApiResponse } from "next";
import { getPlaiceholder } from "plaiceholder";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { src } = req.query;
  const { base64 } = await getPlaiceholder(src as string);

  return res.status(200).json({ base64: base64 });
}
