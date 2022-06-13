import { Burger, Header, MediaQuery, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useCallback } from "react";

export const MyHeader = ({ opened, setOpened }) => {
  const matches = useMediaQuery("(min-width: 900px)", true);

  const handleDrawer = useCallback(() => {
    setOpened(!opened);
  }, [opened, setOpened]);

  return !matches ? (
    <MediaQuery largerThan="sm" styles={{ display: "none" }}>
      <Header height={70} p="md">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Burger mr="xl" onClick={handleDrawer} opened={opened} size="sm" />

          <Text>Hello Free Shavacado</Text>
        </div>
      </Header>
    </MediaQuery>
  ) : null;
};
