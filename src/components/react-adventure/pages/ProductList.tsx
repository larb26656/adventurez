import { useEffect, useState } from "react"

const mockProducts = [
  { id: 1, name: "Laptop Pro", price: 999 },
  { id: 2, name: "Wireless Mouse", price: 29 },
  { id: 3, name: "Running Shoes", price: 89 },
]

export function ProductList() {
  const [products, setProducts] = useState<typeof mockProducts>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setProducts(mockProducts)
      setLoading(false)
    }, 1000)
  }, [])

  if (loading) return <div className="text-center py-10">Loading...</div>

  return (
    <div className="grid grid-cols-3 gap-4">
      {products.map(p => (
        <div key={p.id} className="p-4 bg-white rounded-lg shadow">
          {p.name} - ${p.price}
        </div>
      ))}
    </div>
  )
}