import {
  Avatar,
  Button,
  Col,
  Container,
  Grid,
  Modal,
  Row,
  Spacer,
  Text,
} from "@nextui-org/react";
import Image from "next/image";
import { Item } from "../types/recipes";

type Props = {
  recipe: Item;
  [x: string]: any;
};

export const RecipeModal = ({ recipe, ...props }: Props) => {
  return (
    <Modal {...props}>
      <Modal.Header>
        <Col>
          <Image
            alt={recipe?.name}
            height={500}
            objectFit="cover"
            src={`https://img.hellofresh.com/hellofresh_s3${recipe?.imagePath}`}
            width={1900}
          />
          <Text h4>{recipe?.name}</Text>
        </Col>
      </Modal.Header>
      <Modal.Body>
        <Grid.Container>
          <Grid xs={7}>
            <Text>{recipe?.descriptionMarkdown}</Text>
          </Grid>
          <Grid xs={5}>
            <Row gap={1} justify="space-between">
              <Text b>Cooking Difficulty</Text>
              <Text>{recipe?.difficulty}</Text>
            </Row>
          </Grid>
        </Grid.Container>
        <Spacer x={5} />
        <Grid.Container gap={1}>
          {recipe?.steps.map((step) => (
            <Grid key={step.index + Math.random()} xs={5}>
              <Avatar text={`${step.index}`} />
              <Text>{step?.instructionsMarkdown}</Text>
            </Grid>
          ))}
        </Grid.Container>
      </Modal.Body>
      <Modal.Footer>
        <Container>
          <Row>
            {recipe?.allergens.map((allergen) => (
              <Button css={{ marginRight: "$3" }} key={allergen.id} size="xs">
                {allergen.name}
              </Button>
            ))}
          </Row>
        </Container>
      </Modal.Footer>
    </Modal>
  );
};
