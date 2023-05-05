import { useState } from "react";
import { redirect, Link } from "react-router-dom";
import { isModerator, addProduct } from "../api/api";

export async function loader() {
  const userData = localStorage.getItem("user");
  if (userData) {
    await isModerator(userData);
    return null;
  } else {
    return redirect("/login");
  }
}

function AddProduct() {
  const [formInfo, setFormInfo] = useState({
    productname: "",
    price: "",
    category: "",
    description: "",
    file: null,
  });
  const [response, setResponse] = useState("");

  const onChange = (e) => {
    const { name, value, type } = e.target;
    setFormInfo((prevFormData) => {
      return {
        ...prevFormData,
        [name]: type === "file" ? e.target.files[0] : value,
      };
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", formInfo.file);
    formData.append("productname", formInfo.productname);
    formData.append("price", formInfo.price);
    formData.append("category", formInfo.category);
    formData.append("productdesc", formInfo.productdesc);
    formData.append("sale", 0);
    formData.append("bestSeller", 0);
    formData.append("img", formInfo.file.name);

    setResponse(await addProduct(formData));
  };

  return (
    <section className="form center">
      {response && (
        <div
          className="alert alert-primary alert-dismissible fade show"
          role="alert"
        >
          {response}
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            onClick={() => setResponse("")}
          ></button>
        </div>
      )}

      <h2 className="title small-bottom-spacer">Add a product</h2>
      <form
        className="text flex-column center small-bottom-spacer"
        onSubmit={onSubmit}
      >
        <label htmlFor="productname">Name</label>
        <input
          type="text"
          name="productname"
          onChange={onChange}
          value={formInfo.productname}
          required
        />
        <label htmlFor="price">Price</label>
        <input
          type="number"
          name="price"
          onChange={onChange}
          value={formInfo.price}
          required
        />
        <label htmlFor="category">Category</label>
        <input
          type="text"
          name="category"
          onChange={onChange}
          value={formInfo.category}
          required
        />
        <label htmlFor="productdesc">Description</label>
        <textarea
          name="productdesc"
          className="textbox"
          onChange={onChange}
          value={formInfo.productdesc}
          required
        />
        <label htmlFor="file">Image</label>
        <input type="file" name="file" onChange={onChange} required />
        <button className="button" type="submit">
          Submit
        </button>
      </form>

      <Link to="/dashboard" className="link">
        Back to Dashboard
      </Link>
    </section>
  );
}

export default AddProduct;
