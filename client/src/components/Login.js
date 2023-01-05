import React, { useState, useContext } from "react";
import { SpotifyContext } from "../SpotifyContext";

//imports styles
import "./Login.css";

function Login() {
  //assigns context
  const { setUser, setIsAuthenticated, isAuthenticated } =
    useContext(SpotifyContext);

  console.log("isauthenticatedg boolean", isAuthenticated);

  //assign state
  const defaultFormValues = {
    username: "",
    password: "",
    password_confirmation: "",
  };
  const [form, setForm] = useState(defaultFormValues);
  const [formType, setFormType] = useState("login");
  const [errors, setErrors] = useState([]);

  //updates the form held in state for login or signup
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  console.log("formtype", formType);

  function handleFormClick(e) {
    e.preventDefault();
    setFormType("users");
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetch(`/${formType}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    }).then((res) => {
      if (res.ok) {
        res.json().then((user) => setUser(user));
      } else {
        res.json().then((err) => setErrors(err.error));
      }
      setForm(defaultFormValues);
    });
  }

  console.log("form from login", form);

  return (
    <div className='form'>
      {/* ternary that displays either the login or the signup form */}
      {formType === "login" ? (
        // login form
        <div className='login'>
          <h1 className='login__logo'>🎶Fakeify&reg;</h1>
          <form onSubmit={handleSubmit}>
            <h1>Log in to continue.</h1>
            <input
              className=''
              name='username'
              type='text'
              placeholder='Enter Username'
              value={form.username}
              onChange={handleChange}
              required
            />

            <input
              className=''
              name='password'
              type='password'
              placeholder='Enter Password'
              value={form.password}
              onChange={handleChange}
              required
            />

            <button className='lbutton' onClick={handleSubmit}>
              LOG IN
            </button>
            <br />
            <button onClick={handleFormClick}>
              Dont have an account? SIGNUP
            </button>
            
          </form>
        </div>
      ) : (
        //signup form
        <form onSubmit={handleSubmit}>
          <input
            className=''
            name='username'
            type='text'
            placeholder='Enter Name'
            value={form.username}
            onChange={handleChange}
            required
          />

          <input
            className=''
            name='password'
            type='password'
            placeholder='Enter Password'
            value={form.password}
            onChange={handleChange}
            required
          />

          <input
            className=''
            name='password_confirmation'
            type='password'
            placeholder='Enter Password Confirmation'
            value={form.password_confirmation}
            onChange={handleChange}
            required
          />
        </form>
      )}
      </div>
  );
}

export default Login;
