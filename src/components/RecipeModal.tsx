/* eslint-disable react/jsx-no-bind */
import { useSession } from "@clerk/nextjs";
import {
  Badge,
  Button,
  Card,
  Container,
  Grid,
  Group,
  List,
  Modal,
  Text,
  ThemeIcon,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import Image from "next/image";
import { memo, useCallback, useEffect, useState } from "react";
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
  const [placeholder, setPlaceholder] = useState("");
  const [loading, setLoading] = useState(false);
  const { session } = useSession();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const { error, status } = await addRecipe(session, recipe?.slug);
    setLoading(false);
    if (error.code === "42501") {
      console.info(error);
      showNotification({
        color: "red",
        title: "Oh no",
        message: "Hey there, you already have this recipe favorited 🤥",
      });
    }
  };

  useEffect(() => {
    if (recipe) {
      getPlaceholder(
        `https://img.hellofresh.com/hellofresh_s3${recipe?.imagePath}`,
      )
        .then((value) => setPlaceholder(value.base64))
        .catch((err) => console.log(err));
    }
  }, [recipe?.imagePath, recipe]);

  const removeSymbols = useCallback((text: string) => {
    return text.replace(/[^a-zA-Z.\n ]/g, "");
  }, []);

  return (
    <Modal
      centered
      onClose={onClose}
      opened={opened}
      overflow="inside"
      size="1200"
      title={recipe?.name}
    >
      <Container fluid>
        <Grid>
          {placeholder && (
            <Image
              alt={recipe?.name}
              blurDataURL={placeholder}
              height={500}
              objectFit="cover"
              placeholder="blur"
              src={`https://img.hellofresh.com/hellofresh_s3${recipe?.imagePath}`}
              width={1900}
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
              <form onSubmit={handleSubmit}>
                <Button leftIcon={<Star />} loading={loading} type="submit">
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
                  <List.Item key={step.index + Math.random()}>
                    {removeSymbols(step?.instructionsMarkdown)}
                  </List.Item>
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
