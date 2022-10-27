import { SignIn } from "@clerk/remix";
import { Stack, Text, useMantineColorScheme } from "@mantine/core";
import { dark } from "@clerk/themes";

const LoginPage = () => {
  const { colorScheme } = useMantineColorScheme();
  return (
    <Stack align="center">
      <Text size="lg" weight={500}>
        Welcome to Hello Free Shavacado
      </Text>
      <SignIn
        appearance={{
          baseTheme: colorScheme === "dark" ? dark : undefined,
        }}
        routing="path"
        path="/login"
      />
    </Stack>
  );
};

export default LoginPage;
