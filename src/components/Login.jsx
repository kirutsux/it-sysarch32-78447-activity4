import { Link } from "react-router-dom";
import { useState } from "react";
import { login_route } from "../api/routes.js";
import ReactSVG from "../assets/react.svg";
function Login() {
  const [formLogin, setFormLogin] = useState({
    email: "",
    password: "",
  });
  const [authRes, setAuthRes] = useState(null);

  const handleInputs = (e) => {
    setFormLogin({
      ...formLogin,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmission = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(login_route, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formLogin),
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("email", data.email);
        window.location.href = "/products";
      } else {
        setAuthRes("Please Try Again!");
      }
    } catch (error) {
      console.log(error);
      setAuthRes("Please Try Again");
    }
  };

  return (
    <div className="wrapper">
      <div className="side">
        <img className="image-absolute" src={ReactSVG} alt="React Logo" />
        <div className="desc-relative">
          <h1 className="big-header font-poppins">Welcome Back!</h1>
          <p className="big-subheader font-poppins text-gray">
            Login to your account
          </p>
        </div>
      </div>
      <div className="main">
        <h2 className="font-header font-poppins font-bold mb-3">Login</h2>
        <form onSubmit={handleSubmission} className="form">
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formLogin.email}
              onChange={handleInputs}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formLogin.password}
              onChange={handleInputs}
              required
            />
          </div>
          {authRes && <p className="error-message font-poppins">{authRes}</p>}
          <button className="btn-primary font-poppins" type="submit">
            Login
          </button>
          <p className="font-poppins mt-2">
            Don't have an account?{' '}
            <Link to="/register" className="link">
              Register Here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;