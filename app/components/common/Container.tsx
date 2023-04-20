import { cn } from "~/utils";

type ContainerProps = {
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLElement>;

export const Container = ({ children, ...props }: ContainerProps) => {
  const className = cn(props.className);
  return (
    <main {...props} className={className}>
      {children}
    </main>
  );
};
