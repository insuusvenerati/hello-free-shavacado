import { Loader2 } from "lucide-react";

export const Loader = ({ height = 50, width = 50 }) => {
  return <Loader2 height={height} width={width} stroke="white" className="animate-spin" />;
};
