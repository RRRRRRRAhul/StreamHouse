const CategoryList = ({ dummyCategories }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {dummyCategories.map((cat) => (
            <div
              key={cat.id}
              className="bg-gray-900 p-4 rounded-xl shadow-md hover:scale-105 transition duration-300"
            >
              <h2 className="text-lg font-semibold">{cat.name}</h2>
            </div>
          ))}
        </div>
  )
}

export default CategoryList