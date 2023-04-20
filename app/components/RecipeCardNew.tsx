import { Link } from "@remix-run/react";
import { useState } from "react";
import { RemixImage } from "./RemixImage";

type Props = {
  imageSrc: string;
  title: string;
  body: React.ReactNode;
  footer: React.ReactNode;
  id: string;
};

export const RecipeCardNew = ({ imageSrc, title, body, footer, id }: Props) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return (
    <div
      className="overflow-hidden rounded-md shadow-md transition-all duration-200 ease-in-out hover:scale-105"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link to={`/recipes/${id}`} className="relative">
        <RemixImage
          transformOptions={{ fit: "cover", quality: 20 }}
          width={600}
          height={340}
          responsive={[
            {
              size: {
                width: 600,
                height: 340,
              },
              maxWidth: 600,
            },
          ]}
          className="h-auto w-full object-cover"
          src={imageSrc}
          alt={title}
        />
        {isHovered && (
          <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center text-2xl font-bold text-white opacity-0 transition-all duration-200 ease-in-out hover:opacity-100">
            {title}
          </div>
        )}
      </Link>
      <div className="truncate p-4">{body}</div>
      <div className="card-actions">{footer}</div>
    </div>
  );
};
