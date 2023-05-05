import Carousel from "react-bootstrap/Carousel";
import { Link, useLoaderData } from "react-router-dom";
import Product from "../components/Product";
import { imgUrl } from "../api/api";

function Home() {
  const cameras = useLoaderData();

  const saleElements = cameras.map((camera, idx) => {
    if (camera.sale) {
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
    }
  });

  const slideElements = cameras.map((camera, idx) => {
    if (camera.bestseller) {
      return (
        <Carousel.Item key={idx}>
          <Link to={`products/${camera.id}`}>
            <img
              className="image-large-no-border"
              src={`${imgUrl}/${camera.img}`}
              alt="best seller slide"
            />
          </Link>
          <Carousel.Caption key={idx}>
            <h3 className="black subtitle-bold">{`Best Seller: ${camera.productname}`}</h3>
          </Carousel.Caption>
        </Carousel.Item>
      );
    }
  });

  return (
    <section>
      <article className="flex large-bottom-spacer">
        <div>
          <h3 className="title small-bottom-spacer">Best Sellers</h3>
          <p className="text-indent">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
        <Carousel className="shadow">{slideElements && slideElements}</Carousel>
      </article>

      <article>
        <h3 className="title small-bottom-spacer">Sale Items</h3>
        <div className="grid">{saleElements && saleElements}</div>
      </article>
    </section>
  );
}

export default Home;
