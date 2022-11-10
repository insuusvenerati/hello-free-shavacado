import { Form } from "@remix-run/react";
import { RatingMenu } from "./RatingMenu";
import { RefinementList } from "./RefinementList";

type SidebarProps = React.HTMLAttributes<HTMLDivElement>;

export const Sidebar = ({ ...props }: SidebarProps) => {
  return (
    <div {...props}>
      <Form method="post" action="/imported">
        <label htmlFor="url">Import Recipe</label>
        <input
          placeholder="https://allrecipes.com/recipe/12345"
          type="text"
          className="input"
          name="url"
        />
      </Form>
      <RatingMenu />
      <RefinementList showMoreLimit={50} showMore attribute="allergens.name" operator="and" />
      <RefinementList showMoreLimit={50} showMore attribute="ingredients.name" operator="and" />
      <RefinementList showMoreLimit={50} showMore attribute="tags.name" operator="and" />
    </div>
  );
};
