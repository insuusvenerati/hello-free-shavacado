import type { ResponsiveSize } from "remix-image";
import { remixImageLoader, useResponsiveImage } from "remix-image";
import { cn } from "~/utils";

type RemixImageProps = {
  className?: string;
  loaderUrl?: string;
  responsive?: ResponsiveSize[];
} & React.ImgHTMLAttributes<HTMLImageElement>;

export const RemixImage = ({
  className,
  loaderUrl = "/resource/image",
  responsive = [],
  ...imgProps
}: RemixImageProps) => {
  const responsiveProps = useResponsiveImage(
    imgProps,
    responsive,
    {},
    [1, 2],
    loaderUrl,
    remixImageLoader,
  );
  return <img alt={imgProps.alt} className={cn(className)} {...imgProps} {...responsiveProps} />;
};
