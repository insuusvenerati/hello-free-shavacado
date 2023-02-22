import { Form } from "@remix-run/react";
import { Plus } from "lucide-react";
import { useState } from "react";

export const RecipeCreateForm = () => {
  const [ingredientsFields, setIngredientsFields] = useState([{ name: "", value: "" }]);
  const [stepsFields, setStepsFields] = useState([{ name: "", value: "" }]);

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
    <Form className="flex flex-col gap-4 lg:flex-row" method="post">
      <div className="flex flex-col gap-4">
        <label className="input-group">
          <span>Name</span>
          <input
            name="name"
            type="text"
            placeholder="Lightly fried fish filets"
            className="input input-bordered"
          />
        </label>

        <label className="input-group">
          <span>Description</span>
          <input
            name="description"
            type="text"
            placeholder="Great for a 3am snack"
            className="input input-bordered"
          />
        </label>

        <label className="input-group">
          <span>Difficulty</span>
          <input
            name="difficulty"
            type="text"
            placeholder="It's pretty easy"
            className="input input-bordered"
          />
        </label>
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="font-bold text-lg">Ingredients</h2>
        {ingredientsFields.map((field, index) => (
          <label key={index} className="input-group">
            <span>Ingredient</span>
            <input className="input input-bordered w-full max-w-md" type="text" name={field.name} />
            <button type="button" onClick={handleAddIngredientField} className="btn btn-square">
              <Plus />
            </button>
          </label>
        ))}
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="font-bold text-lg">Steps</h2>
        {stepsFields.map((field, index) => (
          <label key={index} className="input-group">
            <span>Step</span>
            <input className="input input-bordered w-full max-w-md" type="text" name={field.name} />
            <button type="button" onClick={handleAddStepField} className="btn btn-square">
              <Plus />
            </button>
          </label>
        ))}
      </div>
      <button type="submit" className="btn">
        Submit
      </button>
    </Form>
  );
};
