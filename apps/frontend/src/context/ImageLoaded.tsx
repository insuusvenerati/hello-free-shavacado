import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";

type ImageLoadedContextType = {
  isImageLoaded: boolean;
  setIsImageLoaded: Dispatch<SetStateAction<boolean>>;
};

const ImageLoadedContext = createContext<ImageLoadedContextType>({
  isImageLoaded: false,
  setIsImageLoaded: () => undefined,
});

export const ImageLoadedProvider = ({ children }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <ImageLoadedContext.Provider value={{ isImageLoaded, setIsImageLoaded }}>
      {children}
    </ImageLoadedContext.Provider>
  );
};

export const useImageLoadedContext = () => {
  return useContext(ImageLoadedContext);
};
