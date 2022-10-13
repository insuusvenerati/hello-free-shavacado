import { BookmarkSquareIcon } from "@heroicons/react/24/outline";
import { Box, TextInput } from "@mantine/core";

export const AddImportedRecipeForm = () => {
  // const {
  //   onSubmitHandler,
  //   error: addImportedRecipeError,
  //   setUrl,
  //   isError,
  //   isLoading: addImportedRecipeLoading,
  //   url,
  // } = useAddImportedRecipeMutation();

  return (
    <Box mb="sm" component="form">
      <TextInput
        // onChange={(event) => setUrl(event.currentTarget.value)}
        // value={url}
        // disabled={addImportedRecipeLoading}
        // error={isError && addImportedRecipeError?.message}
        icon={<BookmarkSquareIcon width={16} />}
        placeholder="Enter a URL"
        label="Import Recipe"
      />
    </Box>
  );
};
