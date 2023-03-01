/// <reference lib="webworker" />

onmessage = function filterItems(event: MessageEvent<{ items: any[]; inputValue: string }>) {
  const getLabel = (item: any) => item.name;
  const results = event.data.items.filter((item) => {
    const label = getLabel(item);
    return label.toLowerCase().includes(event.data.inputValue.toLowerCase());
  });
  postMessage({ results });
};

export {};
