import { type SelectHTMLAttributes } from "react";

export type SelectOption = {
  value: string;
  label: string;
};

export type SelectProps = {
  title: string;
  options: SelectOption[];
} & SelectHTMLAttributes<HTMLSelectElement>;

export const Select = ({ title, options, ...props }: SelectProps) => {
  const capitalizeFirst = (str: string) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

  const uniqueOptions = options.filter(
    (option, index, self) =>
      index === self.findIndex((t) => t.value === option.value && t.label === option.label),
  );

  const sortedOptions = uniqueOptions.sort((a, b) => a.label?.localeCompare(b.label));

  return (
    <select title={title} className="select-accent select select-sm max-w-xs" {...props}>
      <option disabled className="text-xl">
        {title}
      </option>
      {sortedOptions.map((option) => {
        return (
          <option key={option.value} value={option.value}>
            {capitalizeFirst(option.label)}
          </option>
        );
      })}
    </select>
  );
};
