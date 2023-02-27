import { Share } from "lucide-react";
import { webShare } from "~/utils";

type ShareButtonProps = {
  children: React.ReactNode;
  text: string;
  files?: string[];
  url?: string;
  title?: string;
} & React.ComponentPropsWithoutRef<"button">;

export const ShareButton = ({ children, text, files, url, title, ...props }: ShareButtonProps) => {
  const share = { text, files, url, title };

  return (
    <button onClick={() => webShare({ ...share })} {...props}>
      <div className="inline-flex items-center justify-center gap-1">
        <Share className="h-4 w-4" height={4} width={4} />
        {children}
      </div>
    </button>
  );
};
