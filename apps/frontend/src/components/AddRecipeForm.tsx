import { validate } from "@babel/types";
import { CakeIcon, FilmIcon, TrashIcon } from "@heroicons/react/24/outline";
import {
  ActionIcon,
  Button,
  Container,
  Group,
  MultiSelect,
  Select,
  SelectItem,
  Stepper,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { useAddCreatedRecipeMutation } from "hooks/useCreateRecipeMutation";
import { SyntheticEvent, useState } from "react";
import { z } from "zod";
import { CreatedRecipeCard } from "./CreatedRecipeCard";

const withLabel: SelectItem[] = [
  { label: "Easy", value: "easy" },
  { label: "Medium", value: "medium" },
  { label: "Hard", value: "hard" },
];

const formSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
  description: z.string().min(10, "Description must be at least 10 characters long"),
  difficulty: z.string().optional(),
  ingredients: z.array(z.string()).min(1, "You must add at least one ingredient"),
  steps: z.array(z.string()).min(1, "You must add at least one step"),
  image: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

export const AddRecipeForm = () => {
  const [active, setActive] = useState(0);
  const [tagsList, setTagsList] = useState([{ value: "quick", label: "Quick" }]);
  const [ingredientsSelect, setIngredientsSelect] = useState<SelectItem[]>([
    { value: "eggs", label: "Eggs" },
    { value: "milk", label: "Milk" },
    { value: "chicken", label: "Chicken" },
  ]);

  const {
    getInputProps,
    values: formValues,
    insertListItem,
    reset,
    removeListItem,
    onSubmit,
    errors: formErrors,
    validate: formValidate,
  } = useForm({
    validate: zodResolver(formSchema),
    initialValues: {
      name: "",
      description: "",
      ingredients: [],
      steps: [],
      difficulty: "",
      tags: [],
      image: "",
    },
  });

  const { isLoading, mutate } = useAddCreatedRecipeMutation();

  const stepsFields = formValues.steps.map((step, index) => (
    <Group key={index}>
      <TextInput
        mb="md"
        sx={{ flex: 1 }}
        label={`Step ${index + 1}`}
        placeholder="Wash vegetables"
        {...getInputProps(`steps.${index}`)}
      />
      <ActionIcon color="red" onClick={() => removeListItem("steps", index)}>
        <TrashIcon width={20} />
      </ActionIcon>
    </Group>
  ));

  const nextStep = () => {
    setActive((current) => {
      return current < 4 ? current + 1 : current;
    });
  };

  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

  const handleSubmit = (values: typeof formValues, event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    mutate(values, {
      onSuccess: () => {
        showNotification({
          title: "Recipe added",
          message: "Your recipe has been added successfully",
          color: "teal",
        });
        reset();
      },
    });
  };

  const handleError = (errors: typeof formErrors) => {
    for (const error in errors) {
      showNotification({
        title: "Error",
        message: errors[error],
        color: "red",
      });
    }
  };

  return (
    <form onSubmit={onSubmit(handleSubmit, handleError)}>
      <Container>
        <Title mb="md" order={1}>
          Add your own recipe
        </Title>

        <Stepper active={active}>
          <Stepper.Step description="Name, Description, Difficulty" label="First Step">
            <TextInput {...getInputProps("name")} label="Name" />
            <TextInput mt="md" {...getInputProps("description")} label="Description" />
            <Select mt="md" {...getInputProps("difficulty")} data={withLabel} label="Difficulty" />
          </Stepper.Step>

          <Stepper.Step description="Add your ingredients" label="Ingredients">
            <MultiSelect
              {...getInputProps("ingredients")}
              searchable
              placeholder="Add ingredients"
              icon={<CakeIcon width={16} />}
              creatable
              clearable
              data={ingredientsSelect}
              getCreateLabel={(query) => `+ Create ${query}`}
              onCreate={(query) => {
                const item = { value: query, label: query };
                insertListItem("ingredients", query);
                setIngredientsSelect((current) => [...current, item]);
              }}
              label="Ingredients"
            />
          </Stepper.Step>

          <Stepper.Step description="Add recipe steps" label="Steps">
            {stepsFields.length > 0 ? stepsFields : <Text color="dimmed">No steps yet</Text>}
            <Button onClick={() => insertListItem("steps", "")}>Add Step</Button>
          </Stepper.Step>

          <Stepper.Step description="Add a cover image" label="Image">
            <TextInput
              {...getInputProps("image")}
              label="Image URL"
              icon={<FilmIcon width={16} />}
            />
          </Stepper.Step>

          <Stepper.Completed>
            Looks Great! 🙌
            <MultiSelect
              {...getInputProps("tags")}
              data={tagsList}
              creatable
              clearable
              searchable
              placeholder="Add tags"
              onCreate={(query) => {
                const item = { value: query, label: query };
                insertListItem("tags", query);
                setTagsList((current) => [...current, item]);
              }}
              getCreateLabel={(query) => `+ Add tag ${query}`}
              label="Add some tags?"
            />
            <CreatedRecipeCard
              description={formValues.description}
              name={formValues.name}
              image={formValues.image}
              tags={formValues.tags}
            />
          </Stepper.Completed>
        </Stepper>

        <Group position="right" mt="md">
          <Button
            color="red"
            variant="light"
            onClick={() => {
              setActive(0);
              reset();
            }}
          >
            Start over
          </Button>

          {active !== 0 && <Button onClick={prevStep}>Back</Button>}

          {active !== 4 && <Button onClick={nextStep}>Next step</Button>}

          {active === 4 && (
            <Button loading={isLoading} color="green" type="submit">
              Submit
            </Button>
          )}
        </Group>
      </Container>
    </form>
  );
};
