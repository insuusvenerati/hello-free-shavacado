import { NextApiRequest, NextApiResponse } from "next";
import { hellofreshSearch } from "../../util/hellofresh";
import redis from "../../util/redis";

const oneDay = 60 * 24;

const getRecipes = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { token, searchText } = req.query;
    const response = await redis.get(`cache-${searchText}`);

    if (response) {
      console.log("got cache");
      return res.status(200).json(response);
    }

    const data = await hellofreshSearch(searchText as string, token as string);
    redis.set(`cache-${searchText}`, JSON.stringify(data), "EX", oneDay);
    console.log("set cache");

    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error });
  }
};

export default getRecipes;
