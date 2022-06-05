import { Text } from "@mantine/core";

const PrivacyPage = () => {
  return (
    <div>
      <Text size="xl">
        This app stores a single cookie. It&apos;s used to store the token from the Hello Fresh API which is required by
        Hello Fresh to query for recipes. No personal data is transmitted to or from this app.
      </Text>
    </div>
  );
};

export default PrivacyPage;
