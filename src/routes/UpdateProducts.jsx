import { useLoaderData, Link, redirect } from "react-router-dom";
import Product from "../components/Product";
import { getProducts, isModerator } from "../api/api";

export async function loader() {
  const userData = localStorage.getItem("user");
  if (userData) {
    await isModerator(userData);
    return getProducts();
  } else {
    return redirect("/login");
  }
}

function UpdateProducts() {
  const cameras = useLoaderData();

  const productElements = cameras.map((camera, idx) => {
    return (
      <div key={idx}>
        <div className="small-bottom-spacer">
          <Link className="link" to={`/update/${camera.id}`}>
            <h4 className="subtitle">Update</h4>
          </Link>
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
        <h2 className="title small-bottom-spacer">Update Product</h2>
        <div className="small-bottom-spacer">
          <Link to="/dashboard" className="link">
            Back to Dashboard
          </Link>
        </div>
      </article>

      <article className="grid">{productElements}</article>
    </section>
  );
}

export default UpdateProducts;
