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
import Order from "./component/order/Order";
import AddProduct from "./component/product/AddProduct";
import ProductUpdate from "./component/product/ProductUpdate";
import UserRegistration from "./component/user/UserRegistration";
import Login from "./component/auth/Login";
import ProtectedRoute from "./component/auth/ProtectedRoute";
import Unauthorized from "./component/UnAuthorized";
import UserProfile from "./component/user/UserProfile";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="/products" element={<Product />} />
        <Route path="/products/:name" element={<Product />} />
        <Route
          path="/products/category/:categoryId/products"
          element={<Product />}
        />
        <Route
          path="/product/:productId/details"
          element={<ProductDetails />}
        />

        <Route
          element={
            <ProtectedRoute
              allowedRoles={["ROLE_ADMIN", "ROLE_USER"]}
              useOutlet={true}
            />
          }
        >
          <Route path="/user/:userId/my-cart" element={<Cart />} />
          <Route path="/user/:userId/my-orders" element={<Order />} />
          <Route
            path="/user-profile/:userId/profile"
            element={<UserProfile />}
          />
        </Route>

        <Route
          element={
            <ProtectedRoute useOutlet={true} allowedRoles={["ROLE_ADMIN"]} />
          }
        >
          <Route path="/add-product" element={<AddProduct />} />
          <Route
            path="/update-product/:productId/update"
            element={<ProductUpdate />}
          />
        </Route>
        <Route path="/register" element={<UserRegistration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
