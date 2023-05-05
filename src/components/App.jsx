import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "../routes/Home";
import About from "../routes/About";
import Products from "../routes/Products";
import ProductPage from "../routes/ProductPage";
import Dashboard, { loader as loginLoader } from "../routes/Dashboard";
import AddProduct, { loader as addLoader } from "../routes/AddProduct";
import DeleteProduct, { loader as deleteLoader } from "../routes/DeleteProduct";
import UpdateProducts, {
  loader as updateLoaderOne,
} from "../routes/UpdateProducts";
import UpdateProduct, { loader as updateLoader } from "../routes/UpdateProduct";
import Login, { loader as loggedinLoader } from "../routes/Login";
import Register from "../routes/Register";
import { loader as productLoader } from "../routes/ProductPage";
import Edit, { loader as editLoader } from "../routes/Edit";
import Checkout, { loader as checkoutLoader } from "../routes/Checkout";
import Confirmation from "../routes/Confirmation";
import Layout from "./Layout";
import Error from "./Error";
import PageError from "./PageError";
import { getProducts } from "../api/api";

function productsLoader() {
  return getProducts();
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route
        index
        element={<Home />}
        loader={productsLoader}
        errorElement={<PageError />}
      />
      <Route path="about" element={<About />} />
      <Route
        path="products"
        element={<Products />}
        loader={productsLoader}
        errorElement={<PageError />}
      />
      <Route
        path="products/:id"
        element={<ProductPage />}
        loader={({ params }) => {
          return productLoader(params.id);
        }}
        errorElement={<PageError />}
      />
      <Route
        path="dashboard"
        element={<Dashboard />}
        loader={loginLoader}
        errorElement={<PageError />}
      />
      <Route
        path="add"
        element={<AddProduct />}
        loader={addLoader}
        errorElement={<PageError />}
      />
      <Route
        path="delete"
        element={<DeleteProduct />}
        loader={deleteLoader}
        errorElement={<PageError />}
      />
      <Route
        path="update"
        element={<UpdateProducts />}
        loader={updateLoaderOne}
        errorElement={<PageError />}
      />
      <Route
        path="update/:id"
        element={<UpdateProduct />}
        loader={({ params }) => {
          return updateLoader(params.id);
        }}
        errorElement={<PageError />}
      />
      <Route
        path="login"
        element={<Login />}
        loader={loggedinLoader}
        errorElement={<PageError />}
      />
      <Route
        path="register"
        element={<Register />}
        errorElement={<PageError />}
      />
      <Route
        path="edit"
        element={<Edit />}
        loader={editLoader}
        errorElement={<PageError />}
      />
      <Route
        path="checkout"
        element={<Checkout />}
        loader={checkoutLoader}
        errorElement={<PageError />}
      />
      <Route
        path="confirmation/:id"
        element={<Confirmation />}
        errorElement={<PageError />}
      />
      <Route path="*" element={<Error />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
