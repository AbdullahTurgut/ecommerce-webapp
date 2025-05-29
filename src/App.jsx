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

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="/products" element={<Product />} />
        <Route path="/products/:name" element={<Product />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
