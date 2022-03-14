import { Loading } from "@nextui-org/react";
import axios from "axios";
import { useEffect, useState } from "react";

export const PreviewLink = ({ children, href, ...props }) => {
  const [imagePreview, setImagePreview] = useState("");
  const [isHovering, setIsHovering] = useState(false);

  let inImagePreview = false;
  let inLink = false;

  const handleMouseEnterImage = () => {
    inImagePreview = true;
    setIsHovering(true);
  };

  const handleMouseLeaveImage = () => {
    inImagePreview = false;
    setIsHovering(inLink);
  };

  const handleMouseEnterLink = () => {
    inLink = true;
    setIsHovering(true);
  };

  const handleMouseLeaveLink = () => {
    inLink = false;
    setIsHovering(inImagePreview);
  };

  const handleFetchImage = async (url: string) => {
    const {
      data: { image },
    } = await axios.get("http://localhost:3000/api/preview", {
      params: { url },
    });
    setImagePreview(image);
  };

  useEffect(() => {
    handleFetchImage(href);

    return () => setImagePreview("");
  }, [href]);

  return (
    <span className="relative z-10 inline-block">
      <a
        href={href}
        className={`${isHovering && "underline"}`}
        onMouseEnter={handleMouseEnterLink}
        onMouseLeave={handleMouseLeaveLink}
        onFocus={handleMouseEnterLink}
        onBlur={handleMouseLeaveLink}
      >
        {children}
      </a>
      {isHovering && (
        <a href={href}>
          <span
            style={{
              position: "absolute",
              display: "flex",
              alignItems: "start",
              justifyContent: "center",
            }}
            className="w-36 h-28 absolute -top-32 left-1/2 transform -translate-x-[4.5rem] translate-y-8 flex items-start justify-center"
            onMouseLeave={handleMouseLeaveImage}
            onMouseEnter={handleMouseEnterImage}
            onFocus={handleMouseEnterImage}
            onBlur={handleMouseLeaveImage}
          >
            {imagePreview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                className="w-36 h-24 rounded-md bg-white shadow-lg object-cover object-top"
                style={{
                  width: "250px",
                  height: "250px",
                }}
                src={`data:image/jpeg;base64, ${imagePreview}`}
                alt={children}
              />
            ) : (
              <Loading />
            )}
          </span>
        </a>
      )}
    </span>
  );
};
