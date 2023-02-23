import { Link } from "@remix-run/react";

const CreatedRecipesIndexPage = () => {
  return (
    <p>
      No recipe selected. Select one on the left, or{" "}
      <Link className="link" to="new">
        create a new one.
      </Link>
    </p>
  );
};

export default CreatedRecipesIndexPage;
