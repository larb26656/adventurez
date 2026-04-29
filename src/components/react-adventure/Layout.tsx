import { Link } from "@tanstack/react-router"

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="text-xl font-bold text-blue-600">
              MyShop
            </Link>

            <div className="flex items-center space-x-6">
              <Link
                to="/catalog"
                className="text-gray-600 hover:text-blue-600 transition-colors"
                activeProps={{ className: "text-blue-600 font-medium" }}
              >
                Catalog
              </Link>
              <Link
                to="/cart"
                className="text-gray-600 hover:text-blue-600 transition-colors"
                activeProps={{ className: "text-blue-600 font-medium" }}
              >
                Cart 🛒
              </Link>
              <Link
                to="/login"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {children}
      </main>

      <footer className="bg-gray-800 text-white py-8 mt-auto">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p>© 2024 MyShop. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}