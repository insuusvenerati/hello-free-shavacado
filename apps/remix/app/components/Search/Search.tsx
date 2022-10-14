import type { TextInputProps } from "@mantine/core";
import { CloseButton, TextInput } from "@mantine/core";
import type { ChangeEvent, FC, MouseEventHandler } from "react";
import { useState } from "react";
import { useRef } from "react";
import type { UseSearchBoxProps } from "react-instantsearch-hooks-web";
import { useSearchBox } from "react-instantsearch-hooks-web";

type SearchProps = TextInputProps & {
  hookProps?: UseSearchBoxProps;
};

const ClearButton = ({ onClick }: { onClick: MouseEventHandler<HTMLButtonElement> }) => (
  <CloseButton onClick={onClick} aria-label="Clear search" />
);

export const Search: FC<SearchProps> = ({ hookProps, ...restProps }) => {
  const { query, refine, clear } = useSearchBox({ ...hookProps });
  const [inputValue, setInputValue] = useState(query);
  const ref = useRef<HTMLInputElement>(null);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.currentTarget.value);
    refine(inputValue);
  };

  if (query !== inputValue && document.activeElement !== ref.current) {
    setInputValue(query);
  }

  const onReset = () => {
    clear();
    setInputValue("");
  };

  return (
    <TextInput
      ref={ref}
      onReset={onReset}
      rightSection={<ClearButton onClick={clear} />}
      placeholder="Search"
      onChange={onChange}
      value={inputValue}
      {...restProps}
    />
  );
};
