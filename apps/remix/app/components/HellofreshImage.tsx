import type { ImageProps } from "remix-image";
import Image, { cloudinaryLoader } from "remix-image";

type HellofreshImageProps = {
  src: string;
} & ImageProps;

export const HellofreshImage: React.FC<HellofreshImageProps> = ({ src, ...rest }) => {
  const imageSrc = `/hellofresh_s3${src}`;

  return (
    <Image
      src={imageSrc}
      loader={cloudinaryLoader}
      options={{
        background: undefined,
        fit: "cover",
      }}
      loaderUrl="https://img.hellofresh.com/"
      {...rest}
    />
  );
};
