import type { User } from "@prisma/client";
import { cn, useMatchesData } from "~/utils";

type BaseAccordionProps = {
  defaultChecked?: boolean;
  title: string;
  className?: string;
};

type AccordionProps<T extends React.ElementType> = BaseAccordionProps & {
  as?: T;
  children: React.ReactNode;
};

export const Accordion = <T extends React.ElementType = "div">({
  as: Component = "div" as T,
  defaultChecked = false,
  children,
  title,
  className,
}: AccordionProps<T>) => {
  const { user } = useMatchesData<{ user: User }>("root");
  const classList = [className].filter(Boolean).join(" ");

  const userColorScheme = user?.colorScheme ?? "dark";
  const collapseableStyles = cn("text-2xl font-bold mb-4 rounded collapse-title", {
    "bg-gray-900 text-gray-500": userColorScheme === "dark",
    "bg-gray-100 text-gray-900": userColorScheme === "light",
    "bg-primary-content": userColorScheme === "halloween",
    "bg-accent": userColorScheme === "cream",
  });

  return (
    <div className="collapse-plus collapse">
      <input type="checkbox" defaultChecked={defaultChecked} />
      <h2 className={collapseableStyles}>{title}</h2>
      <div className={classList}>{children}</div>
    </div>
  );
};
