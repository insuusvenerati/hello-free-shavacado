import { z } from "zod";
import { RecipeQuery } from "../../types/recipes";
import { createRouter } from "../createRouter";

const BASE_URL = `https://www.hellofresh.com/gw/recipes/recipes/search?country=us&locale=en-US&`;
const DELETE_ME_TOKEN = process.env.HF_TOKEN;

export const hellofreshRouter = createRouter().query("search", {
  input: z.object({ query: z.string() }),
  async resolve({ input }) {
    const page = 1;
    const skip = page !== 1 ? page * 20 : 0;
    const response = await fetch(`${BASE_URL}take=20&q=${input?.query}&skip=${skip}`, {
      headers: { authorization: `Bearer ${DELETE_ME_TOKEN}` },
    });

    return (await response.json()) as RecipeQuery;
  },
});
