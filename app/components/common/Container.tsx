import { twMerge } from "tailwind-merge";

type ContainerProps = {
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLElement>;

export const Container = ({ children, ...props }: ContainerProps) => {
  const className = twMerge("flex flex-col items-center p-1 lg:p-5 min-h-screen", props.className);
  return (
    <main {...props} className={className}>
      {children}
    </main>
  );
};
