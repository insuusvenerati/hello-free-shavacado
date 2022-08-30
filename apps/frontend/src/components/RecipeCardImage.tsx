import Image, { ImageProps } from "next/future/image";
import { HF_PLACEHOLDERURL } from "util/constants";
import { hellofreshRecipeLoader } from "util/util";

const imageCSS = { width: "100%", height: "auto" };

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
      blurDataURL={`${HF_PLACEHOLDERURL}${src}`}
      sizes="100vw"
      style={imageCSS}
      loader={hellofreshRecipeLoader}
      height={height}
      width={width}
      src={src}
      alt={alt}
    />
  );
};
