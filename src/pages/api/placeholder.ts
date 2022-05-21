import ky from "ky-universal";
import { NextApiRequest, NextApiResponse } from "next";
import { PLACEHOLDER_URL } from "../../util/constants";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { src } = req.query;
  const response = await ky.get(`${PLACEHOLDER_URL}?src=${src}`);
  const data = await response.json();

  return res.status(200).json({ base64: data });
}
