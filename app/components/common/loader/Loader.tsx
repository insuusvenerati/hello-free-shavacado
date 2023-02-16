import { Loader2 } from "lucide-react";

export const Loader = () => {
  return (
    <div className="absolute bottom-3 right-3">
      <Loader2 height={50} width={50} stroke="white" className="animate-spin" />
    </div>
  );
};
