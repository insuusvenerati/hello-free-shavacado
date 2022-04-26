import { NextApiRequest, NextApiResponse } from "next";
import { hellofreshSearch } from "../../util/hellofresh";
import { withSentry } from "@sentry/nextjs";
import * as Sentry from "@sentry/nextjs";
import redis from "../../util/redis";

const oneDay = 60 * 60 * 24;

const getRecipes = async (req: NextApiRequest, res: NextApiResponse) => {
  const { token, searchText, page, ingredients } = req.query;
  const pageNumber = parseInt(page as string);
  const skip = pageNumber !== 1 ? pageNumber * 20 : 0;

  console.log(req.query);

  const commaSeparatedList = !Array.isArray(searchText)
    ? searchText.replace(/[ ,]+/g, ",")
    : undefined;

  const cacheKey = `cache-${commaSeparatedList}-${page}`;

  const response = await redis.get(cacheKey).catch(async (err: Error) => {
    const data = await hellofreshSearch(
      commaSeparatedList,
      token as string,
      ingredients as string,
      {
        skip,
      },
    );

    redis.set(cacheKey, JSON.stringify(data), "EX", oneDay).catch((err) => {
      console.log("Redis cache error", err);
      Sentry.captureException(err);
    });

    return res.status(200).json(data);
  });

  if (response) {
    console.log(`Got ${cacheKey} from cache`);
    return res.status(200).json(response);
  }

  const data = await hellofreshSearch(
    commaSeparatedList,
    token as string,
    ingredients as string,
    {
      skip,
    },
  );

  redis
    .set(cacheKey, JSON.stringify(data), "EX", oneDay)
    .then(() => console.log(`Added ${cacheKey} to the cache`))
    .catch((err) => {
      console.log("Redis cache error", err);
      Sentry.captureException(err);
    });

  return res.status(200).json(data);
};

export default withSentry(getRecipes);
