import { useLoaderData, useNavigate, Link } from "react-router-dom";
import Product from "../components/Product";
import { getProducts, isModerator, deleteProduct } from "../api/api";

export async function loader() {
  const userData = localStorage.getItem("user");
  if (userData) {
    await isModerator(userData);
    return getProducts();
  } else {
    return redirect("/login");
  }
}

function DeleteProduct() {
  const navigate = useNavigate();
  const cameras = useLoaderData();

  async function handleDelete(id) {
    await deleteProduct(id);
    navigate("/delete");
  }

  const productElements = cameras.map((camera, idx) => {
    return (
      <div key={idx}>
        <div className="flex-space-between small-bottom-spacer">
          <h4 className="subtitle">Delete:</h4>
          <i
            className="fa-solid fa-delete-left fa-2x"
            type="button"
            onClick={() => {
              handleDelete(camera.id);
            }}
          ></i>
        </div>
        <Product
          key={idx}
          id={camera.id}
          name={camera.productname}
          img={camera.img}
          price={camera.price}
          desc={camera.productdesc}
          sale={camera.sale}
        />
      </div>
    );
  });

  return (
    <section>
      <article>
        <h2 className="title small-bottom-spacer">Delete Product</h2>
        <div className="bottom-spacer">
          <Link to="/dashboard" className="link">
            Back to Dashboard
          </Link>
        </div>
      </article>

      <article className="grid">{productElements}</article>
    </section>
  );
}

export default DeleteProduct;
