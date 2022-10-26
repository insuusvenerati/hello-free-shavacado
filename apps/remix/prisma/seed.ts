import { db } from "~/util/db.server";

const BASE_URL = `https://www.hellofresh.com/gw/recipes/recipes/search?country=us&locale=en-US&`;

const TOKEN_URL =
  "https://stiforr-cors-anywhere.fly.dev/https://www.hellofresh.com/gw/auth/token?client_id=senf&grant_type=client_credentials";

//Seed the database with some data
async function main() {
  const tokenResponse = await fetch(TOKEN_URL, {
    method: "POST",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "X-Requested-With": "Stiforr",
    },
  });

  const token = await tokenResponse.json();

  for (let skip = 0; skip <= 3750; skip += 250) {
    console.log(skip);

    const response = await fetch(`${BASE_URL}take=250&skip=${skip}`, {
      headers: { authorization: `Bearer ${token.access_token}` },
    });

    const recipes = await response.json();

    await db.$transaction(
      recipes.items.map((item) =>
        db.hellofresh.upsert({
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
        }),
      ),
    );

    // await recipes.items.map(async (item) => {
    //   await db.hellofresh.upsert({
    //     where: { id: item.id },
    //     create: {
    //       name: item.name,
    //       id: item.id,
    //       recipe: item,
    //       description: item.description,
    //     },
    //     update: {
    //       name: item.name,
    //       id: item.id,
    //       recipe: item,
    //       description: item.description,
    //     },
    //   });
    // });
  }
}

main()
  .then(async () => await db.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
