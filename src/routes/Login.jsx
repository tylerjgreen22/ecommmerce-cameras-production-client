import { useState } from "react";
import { useNavigate, Link, redirect } from "react-router-dom";
import { loginUser } from "../api/api";

export function loader() {
  const userData = localStorage.getItem("user");
  if (userData) return redirect("/dashboard");
  return null;
}

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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

  async function handleLogin(e) {
    e.preventDefault();
    const res = await loginUser(formData);
    if (res.accessToken) {
      localStorage.setItem("user", res.accessToken);
      navigate("/dashboard");
    } else {
      setResponse(res.msg);
    }
  }

  return (
    <section className="login--container">
      {response && (
        <div
          className="alert alert-danger alert-dismissible fade show"
          role="alert"
        >
          {response}
        </div>
      )}

      <h2 className="title small-bottom-spacer">Sign-in</h2>
      <form
        onSubmit={handleLogin}
        className="form text flex-column-small small-bottom-spacer"
      >
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
        <button className="button">Submit</button>
      </form>

      <article>
        <h4 className="text small-bottom-spacer">No account? Sign Up:</h4>
        <Link className="link" to="/register">
          Register
        </Link>
      </article>
    </section>
  );
}

export default Login;
