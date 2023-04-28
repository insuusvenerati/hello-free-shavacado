import type { ReactNode, SelectHTMLAttributes } from "react";

export type SelectOption = {
  value: string;
  label: string | ReactNode;
};

export type SelectProps = {
  title: string;
  options: SelectOption[];
} & SelectHTMLAttributes<HTMLSelectElement>;

export const Select = ({ title, options, ...props }: SelectProps) => (
  <select title={title} className="select-accent select select-sm max-w-xs" {...props}>
    <option disabled className="text-xl">
      {title}
    </option>
    {options.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
);
