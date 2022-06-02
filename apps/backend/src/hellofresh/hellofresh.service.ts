import { Injectable, Logger } from '@nestjs/common';
import axios, { AxiosResponse } from 'axios';
import { RecipeQuery } from 'src/recipes';

const BASE_URL = `https://www.hellofresh.com/gw/recipes/recipes/search?country=us&locale=en-US&`;
const CUISINE_URL = `https://gw.hellofresh.com/api/cuisines?country=us&locale=en-US&take=250`;
const DELETE_ME_TOKEN = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NTUxOTE5MjgsImlhdCI6MTY1MjU2MjE4NSwiaXNzIjoic2VuZiIsImp0aSI6IjRkZWY5YTBlLTk3ODctNDBkYi05NzZhLWMxZDQ2OWU3ZjMzOCJ9.4j_4vQ0qmx0wOM_sRaZIEUrC0PzAufRoTtNdzxvQsVg`;

@Injectable()
export class HellofreshService {
  private readonly logger = new Logger(HellofreshService.name);
  async findAll(query: string, page: number) {
    if (!query) {
      return 'No query was supplied';
    }
    const skip = page !== 1 ? page * 20 : 0;
    const response = await axios.get(
      `${BASE_URL}take=20&q=${query}&skip=${skip}`,
      {
        headers: { authorization: `Bearer ${DELETE_ME_TOKEN}` },
      },
    );

    return response.data;
  }

  async findOne(query: string) {
    if (!query) {
      return 'No query was supplied';
    }
    const response = await axios.get(`${BASE_URL}take=1&q=${query}`, {
      headers: { authorization: `Bearer ${DELETE_ME_TOKEN}` },
    });

    return response.data;
  }

  async getAllCuisines() {
    const response = await axios.get(CUISINE_URL, {
      headers: { authorization: `Bearer ${DELETE_ME_TOKEN}` },
    });

    return response.data;
  }

  async getFavoriteRecipes() {
    const response = await axios.get<RecipeQuery>(
      `${BASE_URL}take=16&order=favorites&min-rating=3`,
      {
        headers: { authorization: `Bearer ${DELETE_ME_TOKEN}` },
      },
    );

    const filterRecipes = (response: AxiosResponse<RecipeQuery>) => {
      return response.data.items.filter((item) => item.ratingsCount > 500);
    };

    const filteredRecipes = filterRecipes(response);

    return { ...response.data, filteredRecipes };
  }
}
