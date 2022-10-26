import { BookmarkSquareIcon } from "@heroicons/react/24/outline";
import { Loader, TextInput } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useEffect, useRef } from "react";
import { useTypedFetcher } from "remix-typedjson";
import type { action } from "~/routes/api/import-recipe";

export const AddImportedRecipeForm = () => {
  const fetcher = useTypedFetcher<typeof action>();
  const inputRef = useRef<HTMLFormElement>(null);
  const isSubmitting = fetcher.state === "submitting";
  const isError = fetcher.type === "done" && "error" in fetcher.data;
  const isSuccess = fetcher.type === "done" && !("error" in fetcher.data) && Boolean(fetcher.data);

  useEffect(() => {
    if (isError) {
      showNotification({
        title: "Oh no",
        message: "Something went wrong",
        color: "red",
      });
    }
    if (isSuccess) {
      showNotification({
        title: "Success",
        message: "Recipe imported",
      });
      inputRef.current?.reset();
    }
  }, [fetcher, isError, isSuccess]);

  return (
    <fetcher.Form ref={inputRef} method="post" action="/api/import-recipe">
      <TextInput
        disabled={isSubmitting}
        error={isError && "error" in fetcher.data ? fetcher.data.error : undefined}
        icon={<BookmarkSquareIcon width={16} />}
        rightSection={isSubmitting ? <Loader width={16} /> : undefined}
        placeholder="Enter a URL"
        label="Import Recipe"
        type="text"
        name="url"
      />
    </fetcher.Form>
  );
};
