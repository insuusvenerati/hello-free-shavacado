export const FiltersSidebar = () => {
  return (
    <div className="flex flex-col items-center w-full h-full">
      <div className="flex flex-col items-center w-full">
        <h1 className="text-2xl font-bold">Filters</h1>
        <p className="text-center">Filter recipes by ingredients</p>
        <div className="flex flex-col w-full">
          <div className="flex flex-col w-full">
            <label className="text-sm font-bold">
              Ingredients
              <div className="flex flex-col w-full">
                <input
                  type="text"
                  className="input input-bordered w-full"
                  placeholder="Enter ingredients"
                />
              </div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};
