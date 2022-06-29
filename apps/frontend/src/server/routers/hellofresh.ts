import { z } from "zod";
import { RecipeQuery } from "../../types/recipes";
import { createRouter } from "../createRouter";

const BASE_URL = `https://www.hellofresh.com/gw/recipes/recipes/search?country=us&locale=en-US&`;

export const hellofreshRouter = createRouter().query("search", {
  input: z.object({ query: z.string(), page: z.number() }).required(),
  async resolve({ input, ctx }) {
    const page = input.page;
    const skip = page !== 1 ? page * 20 : 0;
    if (!ctx.token) {
      return await Promise.reject(new Error("Missing hello fresh token"));
    }
    const response = await fetch(`${BASE_URL}take=20&q=${input?.query}&skip=${skip}`, {
      headers: { authorization: `Bearer ${ctx.token}` },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = (await response.json()) as RecipeQuery;

    return data;
  },
});
