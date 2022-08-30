import { HF_BASE_IMAGE_URL } from "./constants";

export const isStringArray = (text: string | string[]): text is string[] => {
  return (text as string[]) !== undefined;
};

type LoaderProps = {
  src: string;
  width: number;
  quality: number;
};

export const hellofreshRecipeLoader = ({ src, width, quality = 70 }: LoaderProps) => {
  return `${HF_BASE_IMAGE_URL}/c_fill,f_auto,fl_lossy,w_${width},q_${quality}/hellofresh_s3${src}`;
};
