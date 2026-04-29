import { useState, useMemo } from "react"

const products = [
  { id: 1, name: "Laptop Pro", price: 999, category: "electronics", image: "https://picsum.photos/300/200?random=1" },
  { id: 2, name: "Wireless Mouse", price: 29, category: "electronics", image: "https://picsum.photos/300/200?random=2" },
  { id: 3, name: "Running Shoes", price: 89, category: "sports", image: "https://picsum.photos/300/200?random=3" },
  { id: 4, name: "Coffee Maker", price: 149, category: "home", image: "https://picsum.photos/300/200?random=4" },
  { id: 5, name: "Desk Lamp", price: 49, category: "home", image: "https://picsum.photos/300/200?random=5" },
  { id: 6, name: "Bluetooth Speaker", price: 79, category: "electronics", image: "https://picsum.photos/300/200?random=6" },
]

export function Catalog() {
  const [category, setCategory] = useState("all")

  const filteredProducts = useMemo(() => {
    if (category === "all") return products
    return products.filter(p => p.category === category)
  }, [category])

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Catalog</h1>

      <div className="flex gap-2 mb-6">
        {["all", "electronics", "sports", "home"].map(cat => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              category === cat
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-600 hover:bg-gray-100 border"
            }`}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map(product => (
          <div
            key={product.id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <span className="text-xs text-gray-500 uppercase">{product.category}</span>
              <h3 className="font-semibold text-lg text-gray-900">{product.name}</h3>
              <p className="text-blue-600 font-bold text-xl mt-1">${product.price}</p>
              <button className="mt-3 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}