import { Badge, Card, Group, Text, Image as MantineImage } from "@mantine/core";
import Image from "next/image";

type Props = {
  image?: string;
  name: string;
  tags?: string[];
  description?: string;
};

export const CreatedRecipeCard = ({ image, name, tags, description }: Props) => {
  return (
    <Card sx={{ width: 700, height: 500 }} mt="md" shadow="md">
      <Card.Section>
        {image ? (
          <Image
            objectFit="cover"
            layout="responsive"
            alt={name}
            src={image}
            height={340}
            width={600}
          />
        ) : (
          <MantineImage fit="cover" height={340} width={600} withPlaceholder />
        )}
      </Card.Section>

      <Group mt="md" mb="md">
        <Text weight="bold">{name}</Text>
        <Text>{description}</Text>
      </Group>

      {tags &&
        tags.map((tag) => (
          <Badge size="xs" key={tag}>
            {tag}
          </Badge>
        ))}
    </Card>
  );
};
