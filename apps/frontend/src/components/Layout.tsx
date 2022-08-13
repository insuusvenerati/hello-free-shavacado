import { Affix, Loader, Transition } from "@mantine/core";
import { Suspense } from "react";
import { InstantSearch } from "react-instantsearch-hooks-web";
import { useIsFetching } from "react-query";
import { algoliaSearch } from "util/algolia";
import { RecipesProvider } from "../context/RecipesContext";
import { MyAppShell } from "./MyAppShell";

export const Layout = ({ children }) => {
  const isFetching = useIsFetching();
  return (
    <RecipesProvider>
      <Affix position={{ bottom: 20, right: 20 }}>
        <Transition transition="slide-up" mounted={!!isFetching}>
          {(transitionStyles) => <Loader styles={transitionStyles} />}
        </Transition>
      </Affix>
      <InstantSearch routing indexName="hellofresh" searchClient={searchClient}>
        <MyAppShell>
          <Suspense>{children}</Suspense>
        </MyAppShell>
      </InstantSearch>
    </RecipesProvider>
  );
};
