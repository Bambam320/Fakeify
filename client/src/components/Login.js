// imports functional tools
import React, { useState, useContext } from "react";

// imports components and styles
import { SpotifyContext } from "../SpotifyContext";
import "./Login.css";

//imports material ui components
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import TextField from '@mui/material/TextField';

function Login() {

  //assigns context
  const { setLocalUser, setIsAuthenticated } = useContext(SpotifyContext);

  //assign state and default values
  const defaultFormValues = {
    username: "",
    password: "",
    password_confirmation: "",
    avatar_url: "",
    region: "",
    email: "",
    birthdate: "",
  };
  const [form, setForm] = useState(defaultFormValues);
  const [formType, setFormType] = useState("login");
  const [errors, setErrors] = useState([]);

  //updates the form held in state for login or signup
  function handleChange(e) {
    console.log("eeeeeeeeeeeeeeeeee", e)
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // changes toggle to use sign up form
  function handleSignUpFormClick(e) {
    e.preventDefault();
    setFormType("users");
    setErrors([]);
  }

  // changes toggle to use login form
  function handleLoginFormClick(e) {
    e.preventDefault();
    setFormType("login");
    setErrors([]);
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
        res.json().then((err) => {
          // console.log("err from login", err)
          setErrors(err.errors)
        });
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
            <div className='errordiv'>
              {errors.map((error) => {
                return <span key={error} className='error'>{error}</span>;
              })}
            </div>
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
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DesktopDatePicker
                label="Birthdate"
                inputFormat="MM/DD/YYYY"
                name='birthdate'
                // value={form.birthdate}
                onChange={(newValue) => console.log(newValue.toString())}
                // figure out how to convert to string and store in form
                // then provide to back end and convert to correct value to display
                renderInput={(params) => <TextField {...params} /> }
              />
            </LocalizationProvider>
            <input
              className=''
              name='birthdate'
              type='text'
              placeholder='Birthdate'
              value={form.birthdate}
              onChange={handleChange}
            />
            <input
              className=''
              name='region'
              type='text'
              placeholder='Region'
              value={form.region}
              onChange={handleChange}
            />
            <input
              className=''
              name='email'
              type='text'
              placeholder='Email address'
              value={form.email}
              onChange={handleChange}
            />
            <button className='signup-button' onClick={handleSubmit}>
              SIGN UP TO FAKEIFY
            </button>
            <button onClick={handleLoginFormClick}>
              Back to Login.
            </button>
            <div className='errordiv'>
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
