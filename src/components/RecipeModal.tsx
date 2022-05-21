/* eslint-disable react/jsx-no-bind */
import { useSession } from "@clerk/nextjs";
import { Badge, Button, Card, Container, Grid, Group, List, Modal, Text, ThemeIcon } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { PostgrestError } from "@supabase/supabase-js";
import Image from "next/image";
import { FormEvent, memo, useCallback } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { CircleCheck, Star } from "tabler-icons-react";
import { Item } from "../types/recipes";
import { addRecipe } from "../util/addRecipe";
import { getPlaceholder } from "../util/getPlaceholder";

type Props = {
  recipe: Item;
  opened: boolean;
  onClose: () => void;
};

const RecipeModal = ({ recipe, opened, onClose }: Props) => {
  const { data: placeholder } = useQuery(["placeholder", recipe?.imageLink], () => getPlaceholder(recipe), {
    enabled: !!recipe?.imagePath,
    staleTime: 64000,
  });
  // const [placeholder, setPlaceholder] = useState("");
  const queryClient = useQueryClient();
  const { session } = useSession();
  const { mutate, isLoading } = useMutation<unknown, PostgrestError, FormEvent<HTMLFormElement>>(
    async (event) => {
      event.preventDefault();
      return await addRecipe(session, recipe.slug);
    },
    {
      onError: (error) => {
        if (error.code === "42501") {
          showNotification({
            color: "red",
            title: "Oh no",
            message: "Hey there, you already have this recipe favorited 🤥",
          });
        }
      },
      onSuccess: () => {
        queryClient.invalidateQueries(["recipes", session]);
        showNotification({
          color: "green",
          title: "Success",
          message: "Successfully added recipe to favorites",
        });
      },
    },
  );

  const removeSymbols = useCallback((text: string) => {
    return text.replace(/[^a-zA-Z.\n ]/g, "");
  }, []);

  return (
    <Modal centered onClose={onClose} opened={opened} overflow="inside" size="1200" title={recipe?.name}>
      <Container fluid>
        <Grid>
          {placeholder && (
            <Image
              alt={recipe?.name}
              blurDataURL={placeholder}
              height={800}
              objectFit="cover"
              placeholder="blur"
              src={`https://img.hellofresh.com/hellofresh_s3${recipe?.imagePath}`}
              width={3200}
            />
          )}
          <Card m="lg" shadow="sm" withBorder>
            <Group position="center">
              {recipe?.allergens.map((allergen) => (
                <Badge key={allergen.id} size="xl" sx={{ marginRight: "$3" }}>
                  {allergen.name}
                </Badge>
              ))}
              <Text>{recipe?.descriptionMarkdown}</Text>
              <form onSubmit={mutate}>
                <Button leftIcon={<Star />} loading={isLoading} type="submit">
                  Add to favorites
                </Button>
              </form>
            </Group>
          </Card>
          <Card m="lg" shadow="sm" withBorder>
            <Group>
              <Text size="xl" weight="bold">
                Instructions
              </Text>

              {/* <Text weight="bold">Cooking Difficulty</Text>
          <Text>{recipe?.difficulty}</Text> */}

              <List
                center
                icon={
                  <ThemeIcon color="teal" radius="xl" size={24}>
                    <CircleCheck size={16} />
                  </ThemeIcon>
                }
                size="xl"
                spacing="xl"
              >
                {recipe?.steps.map((step) => (
                  <List.Item key={step.index + Math.random()}>{removeSymbols(step?.instructionsMarkdown)}</List.Item>
                ))}
              </List>
            </Group>
          </Card>
        </Grid>
      </Container>
    </Modal>
  );
};

export default memo(RecipeModal);
