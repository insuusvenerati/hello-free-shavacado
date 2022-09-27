import { AddRecipeForm } from "components/AddRecipeForm";
import Head from "next/head";

const AddPage = () => {
  return (
    <>
      <Head>
        <title>Add new recipe</title>
      </Head>
      <AddRecipeForm />
    </>
  );
};

export default AddPage;
