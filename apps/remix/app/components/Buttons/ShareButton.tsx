import { Button, ButtonProps } from "@mantine/core";
import { ShareIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/router";

type ShareButtonProps = {
  text?: string;
  image?: string;
} & ButtonProps;

export const ShareButton = ({ text, image, ...rest }: ShareButtonProps) => {
  const router = useRouter();
  if (!navigator.share) return null;

  function handleShare() {
    navigator
      .share({
        url: router.pathname,
        text: image ? image : text,
      })
      .catch((error: DOMException) => {
        if (!error.ABORT_ERR) {
          throw new Error(error.message);
        }
      });
  }

  return (
    <Button {...rest} onClick={handleShare} leftIcon={<ShareIcon width={16} />}>
      Share
    </Button>
  );
};
