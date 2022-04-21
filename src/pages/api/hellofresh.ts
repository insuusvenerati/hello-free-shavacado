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

    const commaSeparatedList = !Array.isArray(searchText)
      ? searchText.replace(/[ ,]+/g, ",")
      : undefined;

    const cacheKey = `cache-${commaSeparatedList}-${page}`;

    const response = await redis.get(cacheKey).catch((err) => {
      throw new Error(`Unable to connect to redis`);
    });

    if (response) {
      console.log("got cache");
      return res.status(200).json(response);
    }

    const data = await hellofreshSearch(commaSeparatedList, token as string, {
      skip,
    });

    redis
      .set(cacheKey, JSON.stringify(data), "EX", oneDay)
      .then(() => console.log("set cache"))
      .catch((err) => {
        throw new Error(`Unable to set cache`);
      });

    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error });
  }
};

export default withSentry(getRecipes);
