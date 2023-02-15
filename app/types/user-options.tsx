import type { User } from "@prisma/client";

export type UserOptions = {
  gridSize?: "sm" | "md" | "lg" | null;
  colorScheme?: "halloween" | "light" | "dark" | "cream" | null;
  recipePageLayout?: "left" | "top" | null;
};

export type PrismaUserWithOptions = User & {
  options: UserOptions;
};
