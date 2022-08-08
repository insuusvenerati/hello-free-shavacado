import { ComponentMeta, ComponentStory } from "@storybook/react";
import { AddToFavorites } from "../components/Buttons/AddToFavorites";

export default {
  title: "AddToFavorites",
  component: AddToFavorites,
} as ComponentMeta<typeof AddToFavorites>;

const Template: ComponentStory<typeof AddToFavorites> = (args) => <AddToFavorites {...args} />;

export const Primary = Template.bind({});
