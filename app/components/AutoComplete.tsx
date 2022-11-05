/* eslint-disable react-hooks/exhaustive-deps */
import type { BaseItem } from "@algolia/autocomplete-core";
import type { AutocompleteOptions } from "@algolia/autocomplete-js";
import { autocomplete, getAlgoliaResults } from "@algolia/autocomplete-js";
import { createLocalStorageRecentSearchesPlugin } from "@algolia/autocomplete-plugin-recent-searches";
import type { Recipe } from "@prisma/client";
import { useNavigate } from "@remix-run/react";
import { createElement, Fragment, useEffect, useMemo, useRef, useState } from "react";
import { render } from "react-dom";
import { usePagination, useSearchBox } from "react-instantsearch-hooks-web";
import { HF_CARD_IMAGE_URL } from "~/constants";
import { searchClient } from "~/models/search";

type AutocompleteProps = Partial<AutocompleteOptions<BaseItem>> & {
  className?: string;
};

type SetInstantSearchUiStateOptions = {
  query: string;
};

export function Autocomplete({ className, ...autocompleteProps }: AutocompleteProps) {
  const autocompleteContainer = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();
  const { query, refine: setQuery } = useSearchBox();
  const { refine: setPage } = usePagination();
  const [instantSearchUiState, setInstantSearchUiState] = useState<SetInstantSearchUiStateOptions>({
    query,
  });

  const plugins = useMemo(() => {
    const recentSearches = createLocalStorageRecentSearchesPlugin({
      key: "instantsearch",
      limit: 3,
      transformSource({ source }) {
        return {
          ...source,
          onSelect({ item }) {
            setInstantSearchUiState({ query: item.label });
          },
        };
      },
    });

    return [recentSearches];
  }, []);

  useEffect(() => {
    setQuery(instantSearchUiState.query);
    setPage(0);
  }, [instantSearchUiState]);

  useEffect(() => {
    if (!autocompleteContainer.current) {
      return;
    }

    const autocompleteInstance = autocomplete<Recipe>({
      ...autocompleteProps,
      container: autocompleteContainer.current,
      panelPlacement: "start",
      plugins,
      classNames: {
        input: "input input-bordered",
        root: "bg-base-300 rounded-box min-w-[200%] lg:w-[200%]",
        detachedSearchButton: "btn btn-sm bg-base-300",
        detachedSearchButtonIcon: "btn-ghost",
        detachedContainer: "bg-base-300",
        form: "bg-base-300",
        // detachedCancelButton: "text-base",
      },
      initialState: { query },
      navigator: {
        navigate({ itemUrl }) {
          navigate(itemUrl);

          // window.location.assign(itemUrl);
        },
        navigateNewTab({ itemUrl }) {
          const windowReference = window.open(itemUrl, "_blank", "noopener");

          if (windowReference) {
            windowReference.focus();
          }
        },
        navigateNewWindow({ itemUrl }) {
          window.open(itemUrl, "_blank", "noopener");
        },
      },
      getSources({ query }) {
        return [
          {
            sourceId: "hellofresh",
            onSelect({ item, setIsOpen }) {
              // setQuery(item.name);
              navigate(`/recipes/${item.id}`);
              setIsOpen(false);
            },
            templates: {
              item({ item, components, html }) {
                return html`
                  <div className="aa-ItemWrapper">
                    <div className="aa-ItemContent">
                      <div className="avatar h-24 w-24">
                        <img
                          src="${HF_CARD_IMAGE_URL}${item.imagePath}"
                          alt="${item.name}"
                          width="96"
                          height="96"
                        />
                      </div>
                      <div className="aa-ItemContentBody">
                        <div className="aa-ItemContentTitle">${item.name}</div>
                        <div className="aa-ItemContentDescription">
                          ${components.Snippet({
                            hit: item,
                            attribute: "description",
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                `;
              },
            },
            getItems() {
              return getAlgoliaResults({
                searchClient: searchClient,
                queries: [
                  {
                    indexName: "hellofresh",
                    query,
                    params: {
                      hitsPerPage: 10,
                      attributesToSnippet: ["description:10"],
                      snippetEllipsisText: "…",
                    },
                  },
                ],
              });
            },
            getItemUrl({ item }) {
              return `/recipes/${item.id}`;
            },
          },
        ];
      },
      onReset() {
        setInstantSearchUiState({ query: "" });
      },
      onSubmit({ state }) {
        setInstantSearchUiState({ query: state.query });
      },
      onStateChange({ prevState, state }) {
        if (prevState.query !== state.query) {
          setInstantSearchUiState({
            query: state.query,
          });
        }
      },
      //@ts-expect-error
      renderer: { createElement, Fragment, render },
    });

    return () => autocompleteInstance.destroy();
  }, []);

  return <div className={className} ref={autocompleteContainer} />;
}
