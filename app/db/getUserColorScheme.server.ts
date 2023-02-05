import type { User } from "@prisma/client";
import { prisma } from "~/db.server";

export const getUserColorScheme = async (user: User | null) => {
  const response = await prisma.user.findFirst({
    where: {
      id: user?.id,
    },
    select: {
      colorScheme: true,
    },
  });
  return response?.colorScheme;
};

export const updateUserColorScheme = async ({
  colorScheme,
  user,
}: {
  colorScheme: string;
  user: User;
}) => {
  return await prisma.user.upsert({
    where: {
      id: user.id,
    },
    create: {
      ...user,
      colorScheme,
    },
    update: {
      colorScheme,
    },
  });
};
