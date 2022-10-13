import { Button, ButtonProps } from "@mantine/core";
import { ShareIcon } from "@heroicons/react/24/solid";
import type { Location } from "react-router-dom";
import { RWebShare } from "react-web-share";

export type ShareButtonProps = {
  text?: string;
  image?: string;
  location: Location;
} & ButtonProps;

export const ShareButton = ({ text, image, location, ...rest }: ShareButtonProps) => {
  const webShare = {
    text: image ? image : text,
    url: location.pathname,
  };

  return (
    <RWebShare data={webShare}>
      <Button leftIcon={<ShareIcon width={16} {...rest} />}>Share</Button>
    </RWebShare>
  );
};
