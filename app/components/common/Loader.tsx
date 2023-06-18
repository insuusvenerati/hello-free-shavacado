import { Loader2 } from "lucide-react";

export const Loader = ({ height = 50, width = 50, color = "white" }) => {
  return <Loader2 height={height} width={width} stroke={color} className="animate-spin" />;
};
