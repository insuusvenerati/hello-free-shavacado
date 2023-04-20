/* eslint-disable jsx-a11y/anchor-is-valid */
const Test = () => {
  return (
    <div className="flex h-screen flex-col">
      {/* Navbar */}
      <nav className="flex items-center justify-between bg-gray-900 p-6 text-white">
        <div className="text-2xl">Cookbook</div>
        <div className="flex">
          <a className="px-4" href="#">
            Home
          </a>
          <a className="px-4" href="#">
            Recipes
          </a>
          <a className="px-4" href="#">
            About
          </a>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Left Sidebar */}
        <aside className="w-64 bg-gray-800 p-6 text-white">
          <div className="mb-6">
            <h3 className="text-xl">Categories</h3>
            <ul>
              <li className="mb-2">
                <a href="#">Breakfast</a>
              </li>
              <li className="mb-2">
                <a href="#">Lunch</a>
              </li>
              <li className="mb-2">
                <a href="#">Dinner</a>
              </li>
              <li className="mb-2">
                <a href="#">Desserts</a>
              </li>
            </ul>
          </div>
        </aside>

        {/* Recipe Grid */}
        <div className="flex flex-1 p-6">
          <div className="grid grid-cols-3 gap-6">
            {/* Recipe Card */}
            <div className="rounded-lg bg-white p-6 shadow-md">
              <img src="https://via.placeholder.com/150x100" alt="Recipe" className="mb-6" />
              <h3 className="mb-2 text-xl">Recipe Name</h3>
              <p className="text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </div>

            {/* Another Recipe Card */}
            <div className="rounded-lg bg-white p-6 shadow-md">
              <img src="https://via.placeholder.com/150x100" alt="Recipe" className="mb-6" />
              <h3 className="mb-2 text-xl">Recipe Name</h3>
              <p className="text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </div>

            {/* Yet Another Recipe Card */}
            <div className="rounded-lg bg-white p-6 shadow-md">
              <img src="https://via.placeholder.com/150x100" alt="Recipe" className="mb-6" />
              <h3 className="mb-2 text-xl">Recipe Name</h3>
              <p className="text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Test;
