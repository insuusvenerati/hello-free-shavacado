import { twMerge } from "tailwind-merge";

type RecipeGridProps = {
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

export const RecipeGrid = ({ children, ...props }: RecipeGridProps) => {
  const className = twMerge(
    "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-20",
    props.className,
  );
  return (
    <div {...props} className={className}>
      {children}
    </div>
  );
};
