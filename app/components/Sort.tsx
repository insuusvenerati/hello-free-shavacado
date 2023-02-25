export const Sort = () => {
  return (
    <select title="sort by" name="gridSize" className="select select-accent select-sm max-w-xs">
      <option className="text-xl" disabled>
        Sort By
      </option>
      <option value="sm">Small</option>
      <option value="md">Medium</option>
      <option value="lg">Large</option>
    </select>
  );
};
