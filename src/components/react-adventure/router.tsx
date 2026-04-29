import { createRouter, createRootRoute, createRoute, Outlet } from "@tanstack/react-router"
import { Layout } from "./Layout"
import { Catalog } from "./pages/Catalog"
import { Cart } from "./pages/Cart"
import { Login } from "./pages/Login"

const rootRoute = createRootRoute({
  component: () => (
    <Layout>
      <Outlet />
    </Layout>
  ),
})

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: function Home() {
    return (
      <div className="text-center py-20">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to MyShop!</h1>
        <p className="text-xl text-gray-600 mb-8">Your one-stop shop for everything</p>
        <a
          href="/catalog"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Browse Catalog
        </a>
      </div>
    )
  },
})

const catalogRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/catalog",
  component: Catalog,
})

const cartRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/cart",
  component: Cart,
})

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: Login,
})

const routeTree = rootRoute.addChildren([
  indexRoute,
  catalogRoute,
  cartRoute,
  loginRoute,
])

export const router = createRouter({ routeTree })

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router
  }
}