import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { TOKEN_URL } from "~/constants";
import { prisma } from "~/db.server";

export type TokenFromApi = {
  access_token: string;
};

export const getTokenFromDatabase = async () => {
  const token = await prisma.token.findFirst({});
  if (!token) {
    const addTokenResponse = await addTokenToDatabase();
    if (typeof addTokenResponse === "string") {
      return addTokenResponse;
    }
    return addTokenResponse.token;
  }
  return token.token;
};

export const addTokenToDatabase = async () => {
  try {
    const token = await getTokenFromApi();
    if (typeof token === "string") throw new Error(token);
    const addTokenResponse = await prisma.token.create({
      data: {
        token: token.access_token,
      },
    });
    return addTokenResponse;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      return error.message;
    }
    if (error instanceof PrismaClientKnownRequestError) {
      console.log(error.message);
      return error.message;
    }
    console.log(error);
    return "An unknown error occurred.";
  }
};

export const getTokenFromApi = async () => {
  try {
    const tokenResponse = await fetch(TOKEN_URL, {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "X-Requested-With": "Stiforr",
        "fly-prefer-region": "ord",
      },
    });
    const token = (await tokenResponse.json()) as TokenFromApi;

    return token;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      return error.message;
    }
    console.log(error);
    return "An unknown error occurred.";
  }
};
