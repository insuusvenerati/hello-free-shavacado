import type { ImportedRecipe } from "@prisma/client";
import type { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import clsx from "clsx";
import { useTypedFetcher } from "remix-typedjson";

type SidebarProps = React.HTMLAttributes<HTMLDivElement>;

export const Sidebar = ({ ...props }: SidebarProps) => {
  const fetcher = useTypedFetcher<{
    result: ImportedRecipe;
    error: PrismaClientKnownRequestError;
  }>();
  const isLoading = fetcher.state === "submitting";
  const isError = !!fetcher.data?.error;
  const inputStyle = clsx("input input-bordered", {
    "input-error": isError,
  });
  const errorMessage =
    isError && fetcher.data?.error.code === "P2002"
      ? "Recipe already exists"
      : "Error importing recipe";

  return (
    <aside {...props}>
      <fetcher.Form method="post" action="/resource/imported">
        <label className="label">
          <input
            disabled={isLoading}
            placeholder="Import recipe from URL"
            type="text"
            className={inputStyle}
            name="url"
          />
        </label>
        {isError && <span>{errorMessage}</span>}
      </fetcher.Form>
      {/* <RatingMenu />
      <RefinementList showMoreLimit={50} showMore attribute="allergens.name" operator="and" />
      <RefinementList showMoreLimit={50} showMore attribute="ingredients.name" operator="and" />
      <RefinementList showMoreLimit={50} showMore attribute="tags.name" operator="and" /> */}
    </aside>
  );
};
