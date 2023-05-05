import { Link, redirect, useLoaderData, useNavigate } from "react-router-dom";
import { getUser, getOrder, getProduct } from "../api/api";
import Product from "../components/Product";

export async function loader() {
  const userData = localStorage.getItem("user");
  if (userData) {
    const res = await getUser(userData);
    const orderData = await getOrder(res.data.id);
    const orderProducts = [];
    for (let i = 0; i < orderData.length; i++) {
      const product = await getProduct(orderData[i].productid);
      orderProducts.push(product);
    }
    return [res.data, orderData, orderProducts];
  } else {
    return redirect("/login");
  }
}

function Dashboard() {
  const navigate = useNavigate();
  const user = useLoaderData()[0];
  const orders = useLoaderData()[1];
  const orderProducts = useLoaderData()[2];

  const groupedOrders = orders.reduce((r, a) => {
    r[a.orderid] = r[a.orderid] || [];
    r[a.orderid].push(a);
    return r;
  }, []);

  const orderElements = groupedOrders.map((orders, idx) => {
    return (
      <div className="bottom-spacer" key={idx}>
        <h3 className="subtitle small-bottom-spacer">
          Order ID: {orders[0].orderid}
        </h3>
        <h3 className="subtitle small-bottom-spacer">
          Date: {orders[0].orderdate.split("T")[0]}
        </h3>
        <div className="grid">
          {orders.map((order, idx) => {
            const product = orderProducts.find(
              (prod) => prod[0].id === order.productid
            );

            return (
              <Product
                key={idx}
                id={product[0].id}
                name={product[0].productname}
                img={product[0].img}
                price={product[0].price}
                desc={product[0].productdesc}
                sale={product[0].sale}
              ></Product>
            );
          })}
        </div>
      </div>
    );
  });

  return (
    <section>
      <article>
        <h2 className="title small-bottom-spacer">Dashboard</h2>
        <h3 className="subtitle small-bottom-spacer">{`Hello ${user.firstname}`}</h3>
        <div className="text-bold flex-column-small small-bottom-spacer">
          <h3>Your checkout info:</h3>
          <p>{user.email}</p>
          <p>{user.street}</p>
          <p>{user.city}</p>
          <p>{user.state}</p>
          <p>{user.zip}</p>
        </div>
        <div className="bottom-spacer">
          <Link to={"/edit"} className="link">
            Edit Info
          </Link>
        </div>
      </article>

      {user.isModerator ? (
        <article className="dashboard--moderator">
          <h3 className="subtitle small-bottom-spacer">Moderator Menu</h3>
          <div className="flex-small bottom-spacer">
            <Link className="link" to="/add">
              Add Product
            </Link>
            <Link className="link" to="/delete">
              Delete Product
            </Link>
            <Link className="link" to="/update">
              Update Product
            </Link>
          </div>
        </article>
      ) : null}

      <article>
        <h2 className="title small-bottom-spacer">Your Orders</h2>
        {orderElements}
      </article>

      <button
        className="button"
        onClick={() => {
          localStorage.removeItem("user");
          navigate("/login");
        }}
      >
        Log Out
      </button>
    </section>
  );
}

export default Dashboard;
