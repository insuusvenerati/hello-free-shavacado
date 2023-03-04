/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useLocalStorage } from "@mantine/hooks";
import { useRef, useState } from "react";
import { useWorker } from "~/hooks/useWorker";

interface AutoCompleteProps<T> {
  items: T[];
  getItemLabel: (item: T) => string;
  renderItem: (item: T) => React.ReactNode;
}

export const AutoComplete = <T extends { id: string }>({
  items,
  getItemLabel,
  renderItem,
}: AutoCompleteProps<T>) => {
  const [suggestions, setSuggestions] = useState<T[]>([]);
  const [recentItems, setRecentItems] = useLocalStorage<T[]>({
    key: "recentItems",
    defaultValue: [],
  });
  const [isInputFocused, setIsInputFocused] = useState(false);
  const workerRef = useWorker({ workerUrl: "worker.js" });
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    inputRef.current!.value = value;

    if (!event.target.value) {
      setSuggestions(recentItems);
    }

    workerRef.current?.postMessage({ items, inputValue: event.target.value });

    const handleMessage = (event: MessageEvent<{ results: T[] }>) => {
      setSuggestions(event.data.results);
    };

    workerRef.current?.addEventListener("message", handleMessage);
  };

  const handleSelectItem = (item: T & { id: string }) => {
    const label = getItemLabel(item);

    inputRef.current!.value = label;
    setRecentItems([item, ...recentItems.filter((recentItem: any) => recentItem.id !== item.id)]);
    setSuggestions([]);
  };

  const handleInputFocus = () => {
    if (!inputRef.current!.value) {
      setSuggestions(recentItems);
    }
    setIsInputFocused(true);
  };

  const handleInputBlur = () => {
    setTimeout(() => {
      setIsInputFocused(false);
      setSuggestions([]);
    }, 200);
  };

  return (
    <div>
      <input
        className="input input-accent input-sm"
        type="text"
        ref={inputRef}
        onChange={handleInputChange}
        title="Search for an ingredient"
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
      />
      <ul className="absolute menu block z-10 bg-base-100 max-w-xs max-h-80 overflow-y-scroll mt-1 shadow-md border-t-0 border">
        {isInputFocused &&
          !!suggestions.length &&
          suggestions.map((suggestion) => (
            <li onClick={() => handleSelectItem(suggestion)} key={getItemLabel(suggestion)}>
              {renderItem(suggestion)}
            </li>
          ))}
      </ul>
    </div>
  );
};
