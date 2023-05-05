import { useState } from "react";
import { registerUser } from "../api/api";
import { redirect, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confPassword: "",
    street: "",
    city: "",
    zip: "",
    state: "",
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

  async function handleRegister(e) {
    e.preventDefault();
    const res = await registerUser(formData);
    if (res.status === 200) {
      setResponse(res.data.msg);
    } else if (res.status === 201) {
      navigate("/login");
    }
  }

  return (
    <div>
      {response && (
        <div
          className="alert alert-danger alert-dismissible fade show"
          role="alert"
        >
          {response}
        </div>
      )}

      <form onSubmit={handleRegister} className="form text flex-column">
        <h3 className="title">Sign-up</h3>
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
    </div>
  );
}

export default Register;
