import { useConnector } from "react-instantsearch-hooks-web";
import connectRatingMenu from "instantsearch.js/es/connectors/rating-menu/connectRatingMenu";

import type {
  RatingMenuConnectorParams,
  RatingMenuWidgetDescription,
} from "instantsearch.js/es/connectors/rating-menu/connectRatingMenu";

export type UseRatingMenuProps = RatingMenuConnectorParams;

export function useRatingMenu(props?: UseRatingMenuProps) {
  return useConnector<RatingMenuConnectorParams, RatingMenuWidgetDescription>(
    connectRatingMenu,
    props
  );
}
