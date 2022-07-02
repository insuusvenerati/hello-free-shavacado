import { XIcon } from "@heroicons/react/outline";
import {
  ActionIcon,
  Burger,
  Grid,
  Header,
  Loader,
  MediaQuery,
  TextInput,
  ThemeIcon,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import Image from "next/image";
import { useCallback } from "react";
import { useRecipesContext } from "../context/RecipesContext";

type Props = {
  opened: boolean;
  setOpened: (opened: boolean) => void;
};

export const MyHeader = ({ opened, setOpened }: Props) => {
  const matches = useMediaQuery("(min-width: 900px)", true);

  const {
    isLoading,
    isError,
    error,
    filteredRecipes,
    onChangeHandler,
    clearSearchHandler,
    searchText,
    onSubmitHandler,
    isFetching,
  } = useRecipesContext();

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
          <Burger mr="md" onClick={handleDrawer} opened={opened} size="sm" />
          <Image alt="logo" src="/android-chrome-192x192.png" width={50} height={50} />
          <Grid justify="center">
            <Grid.Col lg={6} md={12}>
              <form onSubmit={onSubmitHandler}>
                <TextInput
                  value={searchText}
                  error={isError && error?.message}
                  aria-label="Search"
                  onChange={onChangeHandler}
                  placeholder="Search"
                  rightSection={
                    isLoading || isFetching ? (
                      <Loader size="sm" />
                    ) : filteredRecipes ? (
                      <ActionIcon onClick={clearSearchHandler} mr="xs">
                        <ThemeIcon variant="outline">
                          <XIcon width={16} />
                        </ThemeIcon>
                      </ActionIcon>
                    ) : undefined
                  }
                  disabled={isLoading}
                  size="md"
                  type="search"
                />
              </form>
            </Grid.Col>
          </Grid>
        </div>
      </Header>
    </MediaQuery>
  ) : (
    <Header height={70} p="md">
      <Grid justify="center">
        <Grid.Col lg={6} md={12}>
          <form onSubmit={onSubmitHandler}>
            <TextInput
              value={searchText}
              error={isError && error?.message}
              aria-label="Search"
              onChange={onChangeHandler}
              placeholder="Search"
              rightSection={
                isLoading || isFetching ? (
                  <Loader size="sm" />
                ) : filteredRecipes ? (
                  <ActionIcon onClick={clearSearchHandler} mr="xs">
                    <ThemeIcon variant="outline">
                      <XIcon width={16} />
                    </ThemeIcon>
                  </ActionIcon>
                ) : undefined
              }
              disabled={isLoading}
              size="md"
              type="search"
            />
          </form>
        </Grid.Col>
      </Grid>
    </Header>
  );
};
