import type { User } from "@prisma/client";
import { cn, useMatchesData } from "~/utils";

type RecipeGridProps = {
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

export const RecipeGrid = ({ children, ...props }: RecipeGridProps) => {
  const { user } = useMatchesData<{ user: User }>("root");
  const userGridSize = user?.gridSize ?? "md";
  const className = cn("grid grid-cols-1 gap-4 h-full", props.className);
  const gridSizeClass = cn({
    [className]: true,
    "lg:grid-cols-3": userGridSize === "sm",
    "lg:grid-cols-4": userGridSize === "md",
    "lg:grid-cols-5": userGridSize === "lg",
  });

  return (
    <div {...props} className={gridSizeClass}>
      {children}
    </div>
  );
};
