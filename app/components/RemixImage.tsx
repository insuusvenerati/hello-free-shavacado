import type { ResponsiveSize, SizelessOptions } from "remix-image";
import { remixImageLoader, useResponsiveImage } from "remix-image";
import { cn } from "~/utils";

type RemixImageProps = {
  className?: string;
  loaderUrl?: string;
  responsive?: ResponsiveSize[];
  transformOptions?: SizelessOptions;
} & React.ImgHTMLAttributes<HTMLImageElement>;

export const RemixImage = ({
  className,
  loaderUrl = "/resource/image",
  responsive = [],
  transformOptions = {},
  ...imgProps
}: RemixImageProps) => {
  const responsiveProps = useResponsiveImage(
    imgProps,
    responsive,
    transformOptions,
    [1, 2],
    loaderUrl,
    remixImageLoader,
  );
  return <img alt={imgProps.alt} className={cn(className)} {...imgProps} {...responsiveProps} />;
};
