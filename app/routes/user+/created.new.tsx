import { Form, useTransition } from "@remix-run/react";
import type { ActionArgs, LoaderArgs } from "@remix-run/server-runtime";
import { Plus } from "lucide-react";
import { useState } from "react";
import { typedjson, useTypedActionData } from "remix-typedjson";
import { Container } from "~/components/common/Container";
import { createRecipe } from "~/models/recipe.server";
import { requireUser } from "~/session.server";
import { cn } from "~/utils";

export const action = async ({ request }: ActionArgs) => {
  const response = await createRecipe(request);

  return typedjson(response);
};

export const loader = async ({ request }: LoaderArgs) => {
  return await requireUser(request);
};

const CreateRecipePage = () => {
  const data = useTypedActionData<typeof action>();
  const transition = useTransition();
  const isLoading = transition.state === "submitting";
  const [ingredientsFields, setIngredientsFields] = useState([{ name: "ingredients", value: "" }]);
  const [stepsFields, setStepsFields] = useState([{ name: "steps", value: "" }]);

  const buttonStyles = cn("btn", {
    loading: isLoading,
  });

  const handleAddIngredientField = () => {
    const values = [...ingredientsFields];
    values.push({ name: "", value: "" });
    setIngredientsFields(values);
  };

  const handleAddStepField = () => {
    const values = [...stepsFields];
    values.push({ name: "", value: "" });
    setStepsFields(values);
  };
  return (
    <Container className="items-start">
      <h1 className="mb-4 text-xl font-bold">Create Recipe</h1>
      <Form encType="multipart/form-data" className="flex flex-col gap-4 lg:flex-row" method="post">
        <div className="flex flex-col gap-4">
          <label className="input-group">
            <span>Name</span>
            <input
              name="name"
              type="text"
              placeholder="Lightly fried fish filets"
              className="input-bordered input"
            />
          </label>

          <label className="input-group">
            <span>Description</span>
            <input
              name="description"
              type="text"
              placeholder="Great for a 3am snack"
              className="input-bordered input"
            />
          </label>

          <label className="input-group">
            <span>Difficulty</span>
            <input
              name="difficulty"
              type="text"
              placeholder="It's pretty easy"
              className="input-bordered input"
            />
          </label>

          <label className="input-group">
            <input
              accept="imaage/*"
              type="file"
              name="imageUrl"
              className="file-input-bordered file-input"
            />
          </label>

          {data?.result?.imageUrl ? (
            <>
              <h2 className="text-xl font-semibold">Uploaded Image</h2>
              <img
                width={600}
                height={340}
                className="h-80 w-96"
                src={data.result.imageUrl}
                alt="preview"
              />
            </>
          ) : null}
        </div>

        <div className="flex flex-col gap-2">
          {ingredientsFields.map((field, index) => (
            <label key={index} className="input-group">
              <span>Ingredient</span>
              <input
                className="input-bordered input w-full max-w-md"
                type="text"
                name={`ingredients[${index}]`}
              />
              <button type="button" onClick={handleAddIngredientField} className="btn-square btn">
                <Plus />
              </button>
            </label>
          ))}
        </div>

        <div className="flex flex-col gap-2">
          {stepsFields.map((field, index) => (
            <label key={index} className="input-group">
              <span>Step</span>
              <input
                className="input-bordered input w-full max-w-md"
                type="text"
                name={`steps[${index}]`}
              />
              <button type="button" onClick={handleAddStepField} className="btn-square btn">
                <Plus />
              </button>
            </label>
          ))}
        </div>
        <button type="submit" className={buttonStyles}>
          Submit
        </button>
      </Form>
    </Container>
  );
};

export default CreateRecipePage;
