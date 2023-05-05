import { Link, useLoaderData, useNavigate } from "react-router-dom";
import Product from "../components/Product";
import { getProduct, getProducts, imgUrl } from "../api/api";
import { useState } from "react";

export async function loader(id) {
  const camerasData = await getProducts();
  const cameraData = await getProduct(id);
  return [camerasData, cameraData];
}

function ProductPage() {
  const navigate = useNavigate();
  const cameras = useLoaderData()[0];
  const camera = useLoaderData()[1][0];
  const [message, setMessage] = useState();

  function addToCart() {
    const cart = localStorage.getItem("cart");
    if (cart) {
      const data = JSON.parse(cart);
      data.push(camera.id);
      localStorage.setItem("cart", JSON.stringify(data));
    } else {
      localStorage.setItem("cart", JSON.stringify([camera.id]));
    }

    setMessage("Added to Cart");
    navigate(`/products/${camera.id}`);
  }

  const recommendedElements = cameras.map((cam, idx) => {
    if (
      cam.category === camera.category &&
      cam.productname !== camera.productname
    ) {
      return (
        <Product
          key={idx}
          id={cam.id}
          name={cam.productname}
          img={cam.img}
          price={cam.price}
          desc={cam.productdesc}
          sale={cam.sale}
        />
      );
    }
  });

  return (
    <section>
      <div className=" large-bottom-spacer">
        <Link className="link" to="/products">
          Back to Products
        </Link>
      </div>
      <article className="flex large-bottom-spacer">
        <div>
          <h2 className="title small-bottom-spacer">{camera.productname}</h2>
          <p className="text-indent large-bottom-spacer">
            {camera.productdesc}
          </p>

          <div className="flex-space-between">
            {camera.sale ? (
              <div>
                <span className="subtitle-bold small-right-spacer strike-through">
                  ${camera.price}
                </span>
                <span className="subtitle-bold">${camera.price * 0.75}</span>
              </div>
            ) : (
              <span className="subtitle-bold">${camera.price}</span>
            )}
            {message && (
              <div>
                <span className="text small-right-spacer">{message}</span>
                <i
                  className="fa-solid fa-xmark"
                  type="button"
                  onClick={() => {
                    setMessage("");
                  }}
                ></i>
              </div>
            )}
            <button className="button text" onClick={addToCart}>
              Add to Cart
            </button>
          </div>
        </div>
        <img className="image-large shadow" src={`${imgUrl}/${camera.img}`} />
      </article>

      <article>
        <h2 className="title small-bottom-spacer">You might also like</h2>
        <div className="grid">{recommendedElements}</div>
      </article>
    </section>
  );
}

export default ProductPage;
