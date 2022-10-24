import { PrismaClient } from "@prisma/client";
import axios from "axios";

const prisma = new PrismaClient();

const BASE_URL = `https://www.hellofresh.com/gw/recipes/recipes/search?country=us&locale=en-US&`;

const TOKEN_URL =
  "https://stiforr-cors-anywhere.fly.dev/https://www.hellofresh.com/gw/auth/token?client_id=senf&grant_type=client_credentials";

//Seed the database with some data
async function main() {
  const tokenResponse = await axios.post<{ access_token: string }>(
    TOKEN_URL,
    {},
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "X-Requested-With": "Stiforr",
      },
    },
  );

  for (let skip = 0; skip <= 3750; skip += 250) {
    console.log(skip);
    const response = await axios.get(`${BASE_URL}take=250&skip=${skip}`, {
      headers: { authorization: `Bearer ${tokenResponse.data.access_token}` },
    });

    response.data.items.map(async (item) => {
      await prisma.hellofresh.upsert({
        where: { id: item.id },
        create: {
          name: item.name,
          id: item.id,
          recipe: item,
          description: item.description,
        },
        update: {
          name: item.name,
          id: item.id,
          recipe: item,
          description: item.description,
        },
      });
    });
  }
}

main()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
