import { useTypedFetcher } from "remix-typedjson";
import { Form } from "~/components/common/Form";
import type { action } from "~/routes/resource/imported";

export const ImportRecipeForm = () => {
  const fetcher = useTypedFetcher<typeof action>();

  return <Form label="Import Recipe" action="/resource/imported" method="post" fetcher={fetcher} />;
};
