import imageOne from "../assets/semyon-borisov-qqmhc6_30aU-unsplash.jpg";
import imageTwo from "../assets/michael-soledad-8ikE18hSfrk-unsplash.jpg";
import { useState } from "react";
import { sendEmail } from "../api/api";

function About() {
  const [formInfo, setFormInfo] = useState({
    firstName: "",
    email: "",
    text: "",
  });
  const [response, setResponse] = useState("");

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormInfo((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const res = await sendEmail(formInfo);

    setResponse(res.data.message);
    setFormInfo({
      firstName: "",
      email: "",
      text: "",
    });
  };

  return (
    <section>
      <h2 className="title small-bottom-spacer">Who we are</h2>
      <article className="flex large-bottom-spacer">
        <img className="image" src={imageOne} />
        <div className="text-indent">
          <p className="large-bottom-spacer">
            Our main goal is to help get out love of cameras and photography out
            to the world. We are a small team of passionate photographers
            looking to help consumers at home get access to high quality camera
            equipment that normally would only be avaliable from specialist
            stores. Our main goal is to help get out love of cameras and
            photography out to the world. We are a small team of passionate
            photographers looking to help consumers at home get access to high
            quality camera equipment that normally would only be avaliable from
            specialist stores.
          </p>
          <p>
            Our main goal is to help get out love of cameras and photography out
            to the world. We are a small team of passionate photographers
            looking to help consumers at home get access to high quality camera
            equipment that normally would only be avaliable from specialist
            stores. Our main goal is to help get out love of cameras and
            photography out to the world. We are a small team of passionate
            photographers looking to help consumers at home get access to high
            quality camera equipment that normally would only be avaliable from
            specialist stores.
          </p>
        </div>
      </article>

      <h2 className="title small-bottom-spacer">Contact Us</h2>
      <article className="text flex-space-between">
        <div>
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
          <p className="small-bottom-spacer">
            Questions? Get in touch with us via the form below
          </p>
          <form className="flex-column" onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="First Name"
              name="firstName"
              onChange={onChange}
              value={formInfo.firstName}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={onChange}
              value={formInfo.email}
            />
            <textarea
              className="textbox"
              placeholder="Comments"
              name="text"
              onChange={onChange}
              value={formInfo.text}
            />
            <button className="button">Submit</button>
          </form>
        </div>
        <img className="image" src={imageTwo} />
      </article>
    </section>
  );
}

export default About;
