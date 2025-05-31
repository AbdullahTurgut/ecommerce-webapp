import {
  Route,
  Router,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import RootLayout from "./component/layout/RootLayout";
import Home from "./component/home/Home";
import Product from "./component/product/Product";
import ProductDetails from "./component/product/ProductDetails";
import "react-toastify/dist/ReactToastify.css";
import Cart from "./component/cart/Cart";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="/products" element={<Product />} />
        <Route path="/products/:name" element={<Product />} />
        <Route
          path="/product/:productId/details"
          element={<ProductDetails />}
        />
        <Route
          path="/products/category/:categoryId/products"
          element={<Product />}
        />
        <Route path="/user/:userId/my-cart" element={<Cart />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
