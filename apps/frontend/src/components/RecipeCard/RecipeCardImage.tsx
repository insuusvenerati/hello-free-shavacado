import Image, { ImageProps } from "next/image";

type Props = {
  src: string;
  height: number;
  width: number;
  alt: string;
} & ImageProps;

export const RecipeCardImage = ({ height, width, src, alt, ...props }: Props) => {
  return (
    <Image
      {...props}
      placeholder="blur"
      objectFit="cover"
      layout="responsive"
      height={height}
      width={width}
      src={src}
      alt={alt}
    />
  );
};
