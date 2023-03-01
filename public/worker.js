/// <reference lib="webworker" />

onmessage = function filterItems(event) {
  const getLabel = (item) => item.name;
  const results = event.data.items.filter((item) => {
    const label = getLabel(item);
    return label.toLowerCase().includes(event.data.inputValue.toLowerCase());
  });
  postMessage({ results });
};
