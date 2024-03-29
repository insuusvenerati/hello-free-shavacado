import { useCatch } from "@remix-run/react";
import type { CatchBoundaryComponent } from "@remix-run/react/dist/routeModules";
import { useInfiniteHits } from "react-instantsearch-hooks-web";
import { RecipeHits } from "~/components/RecipeHits";

export default function Index() {
  const { showMore } = useInfiniteHits();
  return (
    <>
      <main className="container mx-auto mt-5 mb-5">
        {/* <div className="mb-2 grid items-center justify-center gap-2 md:flex">
          <Pagination />
          <Sort
            items={[
              { label: "Featured", value: "hellofresh" },
              { label: "Rating Desc", value: "hellofresh_rating_desc" },
              { label: "Rating Asc", value: "hellofresh_rating_asc" },
            ]}
          />
        </div> */}
        <div className="grid grid-cols-1 gap-4 p-2 md:grid-cols-2 md:p-0 lg:grid-cols-6 lg:p-0">
          <RecipeHits />
        </div>
        <button onClick={showMore} className="btn my-2 w-full">
          Show more
        </button>
      </main>
    </>
  );
}

export const CatchBoundary: CatchBoundaryComponent = () => {
  const caught = useCatch();
  return (
    <div className="container mx-auto mt-5 mb-5">
      <h1>Something went wrong</h1>
      <pre>{caught.data}</pre>
    </div>
  );
};
