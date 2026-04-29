export function Cart() {
  const cartItems = [
    { id: 1, name: "Laptop Pro", price: 999, quantity: 1, image: "https://picsum.photos/100/100?random=1" },
    { id: 2, name: "Wireless Mouse", price: 29, quantity: 2, image: "https://picsum.photos/100/100?random=2" },
  ]

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Shopping Cart</h1>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        {cartItems.map(item => (
          <div key={item.id} className="flex items-center p-4 border-b last:border-b-0">
            <img
              src={item.image}
              alt={item.name}
              className="w-20 h-20 object-cover rounded-lg"
            />
            <div className="flex-1 ml-4">
              <h3 className="font-semibold text-lg">{item.name}</h3>
              <p className="text-gray-500">${item.price} x {item.quantity}</p>
            </div>
            <div className="text-right">
              <p className="font-bold text-lg">${item.price * item.quantity}</p>
              <button className="text-red-500 hover:text-red-700 text-sm">
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 bg-white rounded-xl shadow-md p-6">
        <div className="flex justify-between text-xl font-bold">
          <span>Total:</span>
          <span>${total}</span>
        </div>
        <button className="mt-4 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
          Checkout
        </button>
      </div>
    </div>
  )
}