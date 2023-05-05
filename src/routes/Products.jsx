import { useLoaderData } from "react-router-dom";
import Product from "../components/Product";
import image from "../assets/nordwood-themes-F3Dde_9thd8-unsplash (1).jpg";

function Products() {
  const cameras = useLoaderData();
  const productElements = cameras.map((camera, idx) => {
    return (
      <Product
        key={idx}
        id={camera.id}
        name={camera.productname}
        img={camera.img}
        price={camera.price}
        desc={camera.productdesc}
        sale={camera.sale}
      />
    );
  });

  return (
    <section>
      <h2 className="title small-bottom-spacer">Our Products</h2>
      <article className="flex large-bottom-spacer">
        <div className="text-indent">
          <p>
            At Kling-Wolf Camera Co. we strive to provide the best quality
            cameras and accesories for our patrons. To that end, all of our
            equipment has been properly checked by master photographers to
            ensure the utmost quality for the latest addition to your camera
            collection. Please shop our choice selection below.
          </p>
          <br />
          <br />
          <p>
            At Kling-Wolf Camera Co. we strive to provide the best quality
            cameras and accesories for our patrons. To that end, all of our
            equipment has been properly checked by master photographers to
            ensure the utmost quality for the latest addition to your camera
            collection. Please shop our choice selection below.
          </p>
        </div>
        <img className="image-large" src={image} alt="" />
      </article>

      <h2 className="title small-bottom-spacer">Cameras</h2>
      <article className="grid">{productElements}</article>
    </section>
  );
}

export default Products;
