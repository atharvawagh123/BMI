import React, { useState } from "react";
import "./Login.css";
import useForm from "./useForm";

const Login = () => {
  const { values, errors, handleChange, handleSubmit } = useForm(
    { email: "", password: "" },
    (values) => {
      console.log(values); // Replace with your login logic
    }
  );

  const [isGreenTheme, setIsGreenTheme] = useState(true);

  const toggleTheme = () => {
    setIsGreenTheme(!isGreenTheme);
  };

  return (
    <div
      className={`login-page ${isGreenTheme ? "green-theme" : "white-theme"}`}
    >
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              className={errors.email ? "error" : ""}
              required
            />
            {errors.email && <p className="error-message">{errors.email}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              className={errors.password ? "error" : ""}
              required
            />
            {errors.password && (
              <p className="error-message">{errors.password}</p>
            )}
          </div>
          {(errors.email || errors.password) && (
            <p className="error-message">Please fill in the fields</p>
          )}
          <button type="submit">Login</button>
        </form>
        <button onClick={toggleTheme} className="theme-toggle-button">
          Toggle Theme
        </button>
      </div>
    </div>
  );
};

export default Login;
