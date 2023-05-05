import { useState } from "react";
import { redirect, useLoaderData, useNavigate, Link } from "react-router-dom";
import { getProduct, updateProduct, isModerator } from "../api/api";

export async function loader(id) {
  const userData = localStorage.getItem("user");
  if (userData) {
    await isModerator(userData);
    return getProduct(id);
  } else {
    return redirect("/login");
  }
}

function UpdateProduct() {
  const camera = useLoaderData()[0];
  const navigate = useNavigate();

  const [formInfo, setFormInfo] = useState({
    productname: camera.productname,
    price: camera.price,
    category: camera.category,
    productdesc: camera.productdesc,
    sale: camera.sale,
    bestseller: camera.bestseller,
    img: camera.img,
    file: null,
  });

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormInfo((prevFormData) => {
      return {
        ...prevFormData,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  };

  const onFileChange = (e) => {
    const { name } = e.target;
    setFormInfo((prevFormData) => {
      return {
        ...prevFormData,
        [name]: e.target.files[0],
      };
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formInfo.file ? formData.append("file", formInfo.file) : null;
    formData.append("productname", formInfo.productname);
    formData.append("price", formInfo.price);
    formData.append("category", formInfo.category);
    formData.append("productdesc", formInfo.productdesc);
    formData.append("sale", formInfo.sale ? 1 : 0);
    formData.append("bestseller", formInfo.bestseller ? 1 : 0);
    formData.append("img", formInfo.file ? formInfo.file.name : formInfo.img);

    await updateProduct(camera.id, formData);

    navigate("/update");
  };

  return (
    <section className="form center">
      <h2 className="title small-bottom-spacer">Update {camera.productname}</h2>
      <form
        className="text flex-column small-bottom-spacer"
        onSubmit={onSubmit}
      >
        <label htmlFor="productname">Name</label>
        <input
          type="text"
          name="productname"
          onChange={onChange}
          value={formInfo.productname}
        />
        <label htmlFor="price">Price</label>
        <input
          type="number"
          name="price"
          onChange={onChange}
          value={formInfo.price}
        />
        <label htmlFor="category">Category</label>
        <input
          type="text"
          name="category"
          onChange={onChange}
          value={formInfo.category}
        />
        <label htmlFor="productdesc">Description</label>
        <textarea
          className="textbox"
          name="productdesc"
          onChange={onChange}
          value={formInfo.productdesc}
        />
        <label htmlFor="sale">Sale</label>
        <input
          className="checkbox"
          type="checkbox"
          name="sale"
          onChange={onChange}
          checked={formInfo.sale}
        />
        <label htmlFor="bestseller">Best Seller</label>
        <input
          className="checkbox"
          type="checkbox"
          name="bestseller"
          onChange={onChange}
          checked={formInfo.bestseller}
        />
        <label htmlFor="file">Image</label>
        <input type="file" name="file" onChange={onFileChange} />
        <button className="button" type="submit">
          Submit
        </button>
      </form>

      <Link to="/dashboard" className="link">
        {"<--"} Back to Dashboard
      </Link>
    </section>
  );
}

export default UpdateProduct;
