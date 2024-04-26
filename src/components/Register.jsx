import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { register_route } from "../api/routes";
import ReactSVG from "../assets/react.svg";

function Register() {
  const [registerForm, setRegisterForm] = useState({
    email: "",
    password: "",
  });
  const [authRes, setAuthRes] = useState(null);

  const handleInputs = (e) => {
    setRegisterForm({
      ...registerForm,
      [e.target.name]: e.target.value,
    });
  };

  const navigate = useNavigate();

  const handleSubmission = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(register_route, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerForm),
      });
      const data = await res.json();
      if (res.ok) {
        navigate("/");
      } else {
        setAuthRes(data.message);
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
        <h1 className="big-header font-poppins">Welcome to Activity 4</h1>
        <p className="big-subheader font-poppins text-gray">
          Register your account
        </p>
      </div>
    </div>
    <div className="main">
      <h2 className="form-title font-header font-poppins font-bold mb-3">Register</h2>
      <form onSubmit={handleSubmission} className="register-form">
        <input
          type="email"
          name="email"
          value={registerForm.email}
          onChange={handleInputs}
          placeholder="Enter your email"
          className="form-input"
        />
        <input
          type="password"
          name="password"
          value={registerForm.password}
          onChange={handleInputs}
          placeholder="Enter your password"
          className="form-input"
        />
        {authRes && <p className="error-message text-red text-center">{authRes}</p>}
        <button type="submit" className="submit-button">Register</button>
        <Link to="/" className="login-link text-center td-none font-poppins mt-2">
          Already have an account? Login
        </Link>
      </form>
    </div>
  </div>
  );
}

export default Register;