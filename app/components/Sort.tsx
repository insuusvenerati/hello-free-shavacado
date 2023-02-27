import { Form, useSearchParams } from "@remix-run/react";

export const Sort = () => {
  const [searchParams] = useSearchParams();
  const orderBy = searchParams.get("orderBy") || "averageRating";
  return (
    <Form className="flex gap-2" method="get" action="/">
      <select
        defaultValue={orderBy}
        title="sort by"
        name="orderBy"
        className="select select-accent select-sm max-w-xs"
      >
        <option value="averageRating">Rating</option>
        <option value="difficulty">Difficulty</option>
        <option value="name">Name</option>
      </select>
      <select
        title="Direction"
        className="select select-accent select-sm max-w-xs"
        name="direction"
      >
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
      <button className="btn btn-sm" type="submit">
        Sort
      </button>
    </Form>
  );
};
