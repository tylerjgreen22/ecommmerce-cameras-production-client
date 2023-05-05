import { useLoaderData, useNavigate, Link } from "react-router-dom";
import { getProduct, getUser, addOrder } from "../api/api";
import Product from "../components/Product";
import { useState } from "react";

export async function loader() {
  const cart = JSON.parse(localStorage.getItem("cart"));
  const userData = localStorage.getItem("user");
  const checkoutProducts = [];
  let total = 0;
  if (cart) {
    for (let i = 0; i < cart.length; i++) {
      const product = await getProduct(cart[i]);
      checkoutProducts.push(product);
      product[0].sale
        ? (total += product[0].price * 0.75)
        : (total += product[0].price);
    }
    if (userData) {
      const res = await getUser(userData);
      return [checkoutProducts, res.data, total];
    }
    return [checkoutProducts, total];
  } else {
    return [checkoutProducts, total];
  }
}

function Checkout() {
  const navigate = useNavigate();
  const checkoutProducts = useLoaderData()[0];
  const total = useLoaderData()[useLoaderData().length - 1];
  const user = useLoaderData()[1]
    ? useLoaderData()[1]
    : {
        firstname: "",
        lastname: "",
        email: "",

        street: "",
        city: "",
        zip: "",
        state: "",
      };

  const [formData, setFormData] = useState({
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    street: user.street,
    city: user.city,
    zip: user.zip,
    state: user.state,
  });

  const checkoutElements = checkoutProducts.map((product, idx) => {
    return (
      <div key={idx}>
        <div className="flex-space-between small-bottom-spacer">
          <h4 className="text">Remove from Cart:</h4>
          <i
            className="fa-solid fa-delete-left fa-2x"
            type="button"
            onClick={() => {
              handleRemove(product[0].id);
            }}
          ></i>
        </div>
        <Product
          key={idx}
          id={product[0].id}
          name={product[0].productname}
          img={product[0].img}
          price={product[0].price}
          desc={product[0].productdesc}
          sale={product[0].sale}
        />
      </div>
    );
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const orderId = Math.floor(Math.random() * 123456);
    const userId = user ? user.id : null;
    const address = `${formData.street} ${formData.city} ${formData.zip} ${formData.state}`;
    const date = new Date().toISOString().split("T")[0];
    await checkoutProducts.forEach((product) => {
      addOrder({
        orderid: orderId,
        userid: userId,
        productid: product[0].id,
        orderdate: date,
        address: address,
      });
    });

    localStorage.removeItem("cart");
    navigate(`/confirmation/${orderId}`);
  }

  function handleRemove(id) {
    const cart = JSON.parse(localStorage.getItem("cart"));
    cart.splice(cart.indexOf(id), 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    navigate("/checkout");
  }

  return (
    <section>
      <h2 className="title small-bottom-spacer">Checkout</h2>

      {checkoutProducts.length ? (
        <div>
          <article className="large-bottom-spacer">
            <h3 className="subtitle small-bottom-spacer">Your Cart:</h3>
            <div className="grid">{checkoutElements}</div>
          </article>
          <article className="large-bottom-spacer">
            <h3 className="subtitle small-bottom-spacer">Your Total:</h3>
            <h3 className="text-bold">{`$${total}`}</h3>
          </article>
          <article>
            <h3 className="subtitle small-bottom-spacer">Your Info:</h3>
            <form onSubmit={handleSubmit} className="form text flex-column">
              <input
                type="text"
                placeholder="First name"
                onChange={handleChange}
                name="firstname"
                value={formData.firstname}
                required
              />
              <input
                type="text"
                placeholder="Last name"
                onChange={handleChange}
                name="lastname"
                value={formData.lastname}
                required
              />
              <input
                type="email"
                placeholder="Email"
                onChange={handleChange}
                name="email"
                value={formData.email}
                required
              />
              <input
                type="text"
                placeholder="Street"
                onChange={handleChange}
                name="street"
                value={formData.street}
                required
              />
              <input
                type="text"
                placeholder="City"
                onChange={handleChange}
                name="city"
                value={formData.city}
                required
              />
              <input
                type="number"
                placeholder="Zip"
                onChange={handleChange}
                name="zip"
                value={formData.zip}
                required
              />
              <input
                type="text"
                placeholder="State"
                onChange={handleChange}
                name="state"
                value={formData.state}
                required
              />
              <button className="button">Submit</button>
            </form>
          </article>
        </div>
      ) : (
        <div>
          <h3 className="subtitle small-bottom-spacer">No Items to Checkout</h3>
          <Link className="link" to="/">
            Return to home page
          </Link>
        </div>
      )}
    </section>
  );
}

export default Checkout;
