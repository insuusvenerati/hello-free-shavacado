import { NextApiRequest, NextApiResponse } from "next";
import { hellofreshSearch } from "../../util/hellofresh";
import { withSentry } from "@sentry/nextjs";
import redis from "../../util/redis";

const oneDay = 60 * 60 * 24;

const getRecipes = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { token, searchText, page } = req.query;
    const pageNumber = parseInt(page as string);
    const skip = pageNumber !== 1 ? pageNumber * 20 : 0;

    const response = await redis.get(`cache-${searchText}-${page}`);

    if (response) {
      console.log("got cache");
      return res.status(200).json(response);
    }

    const data = await hellofreshSearch(
      searchText as string,
      token as string,
      skip
    );

    redis.set(
      `cache-${searchText}-${page}`,
      JSON.stringify(data),
      "EX",
      oneDay
    );
    console.log("set cache");

    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error });
  }
};

export default withSentry(getRecipes);
