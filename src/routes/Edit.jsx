import { useState } from "react";
import { redirect, useLoaderData } from "react-router-dom";
import { editUser, getUser } from "../api/api";

export async function loader() {
  const userData = localStorage.getItem("user");
  if (userData) {
    const res = await getUser(userData);
    return res;
  }
  return redirect("/login");
}

function Edit() {
  const user = useLoaderData().data;
  const [formData, setFormData] = useState({
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    password: "",
    confPassword: "",
    street: user.street,
    city: user.city,
    zip: user.zip,
    state: user.state,
  });
  const [response, setResponse] = useState("");

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
    let res;
    if (formData.password.length) {
      res = await editUser(user.id, formData);
    } else {
      res = await editUser(user.id, {
        firstname: formData.firstname,
        lastname: formData.lastname,
        email: formData.email,
        street: formData.street,
        city: formData.city,
        zip: formData.zip,
        state: formData.state,
      });
    }

    setResponse(res.data.msg);

    if (res.data.msg === "User Updated") {
      localStorage.removeItem("user");
    }
  }

  return (
    <section>
      {response && (
        <div
          className="alert alert-primary alert-dismissible fade show"
          role="alert"
        >
          {response}
        </div>
      )}
      <h2 className="title small-bottom-spacer">Edit Info</h2>
      <form className=" form text flex-column" onSubmit={handleSubmit}>
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
          type="password"
          placeholder="Password"
          onChange={handleChange}
          name="password"
          value={formData.password}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          onChange={handleChange}
          name="confPassword"
          value={formData.confPassword}
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
    </section>
  );
}

export default Edit;
