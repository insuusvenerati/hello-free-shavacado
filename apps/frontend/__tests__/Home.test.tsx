import Home from "pages/index";
import { render, screen } from "@testing-library/react";
import { InstantSearch } from "react-instantsearch-hooks-web";
import { algoliaSearch } from "../src/util/algolia";
import "@testing-library/jest-dom";

describe("Home page", () => {
  it("renders without crashing", () => {
    render(
      <InstantSearch indexName="hellofresh" searchClient={algoliaSearch}>
        <Home />
      </InstantSearch>,
    );

    expect(screen.getByRole("search"));
  });
});
