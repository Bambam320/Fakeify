import React, { useState, useContext } from "react";

import { SpotifyContext } from "../SpotifyContext";

//imports styles
import "./Login.css";

function Login() {

  //assigns context
  const { setLocalUser, setIsAuthenticated } = useContext(SpotifyContext);

  //assign state and default values
  const defaultFormValues = {
    username: "",
    password: "",
    password_confirmation: "",
    avatar_url: "",
  };
  const [form, setForm] = useState(defaultFormValues);
  const [formType, setFormType] = useState("login");
  const [errors, setErrors] = useState([]);

  //updates the form held in state for login or signup
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // changes toggle to use sign up form
  function handleSignUpFormClick(e) {
    e.preventDefault();
    setFormType("users");
  }

  // changes toggle to use login form
  function handleLoginFormClick(e) {
    e.preventDefault();
    setFormType("login");
  }

  // submits the login or signup form
  function handleSubmit(e) {
    e.preventDefault();
    let bodyForm = formType === 'login' ? {
      username: form.username,
      password: form.password
    } : form
    fetch(`/${formType}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bodyForm),
    }).then((res) => {
      if (res.ok) {
        res.json().then((user) => {
          setIsAuthenticated(true)
          setLocalUser(user)
        });
      } else {
        res.json().then((err) => setErrors(err.error));
      }
      setForm(defaultFormValues);
    });
  }


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
            <button className='login-button' onClick={handleSubmit}>
              LOG IN TO FAKEIFY
            </button>
            <button onClick={handleSignUpFormClick}>
              Dont have an account? SIGNUP
            </button>
          </form>
        </div>

      ) : (

        //signup form
        <div className="login" >
          <h1 className='login__logo'>🎶Fakeify&reg;</h1>
          <form onSubmit={handleSubmit}>
          <h1>Sign up for some sweet tunes!</h1>
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
            <input
              className=''
              name='avatar_url'
              type='text'
              placeholder='Avatar image URL address'
              value={form.avatar_url}
              onChange={handleChange}
            />
            <button className='signup-button' onClick={handleSubmit}>
              SIGN UP TO FAKEIFY
            </button>
            <button onClick={handleLoginFormClick}>
              Back to Login.
            </button>
            <div>
            {errors.map((error) => {
              return <span key={error} className='error'>{error}</span>;
            })}
          </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Login;
