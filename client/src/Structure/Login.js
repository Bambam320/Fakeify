// imports functional tools
import React, { useState, useContext, useEffect } from "react";
import * as moment from 'moment'

// imports components and styles
import { SpotifyContext } from "../SpotifyContext";
import "../CSS/Login.css";

//imports material ui components
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import TextField from '@mui/material/TextField';

function Login() {
  //assigns context
  const { setLocalUser, setIsAuthenticated, autoLoginError } = useContext(SpotifyContext);

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
  const [errors, setErrors] = useState([]);
  const [form, setForm] = useState(defaultFormValues);
  const [formType, setFormType] = useState("login");

  //grabs any errors from App.js and lists on the login page
  useEffect(() => {
    setTimeout(() => setErrors(autoLoginError), 5000)
  }, [autoLoginError]);

  //updates the form held in state for login or signup
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  //handles the birthdate update
  function handleTimeChange(e) {
    let birthdate = e._d.toDateString()
    setForm({ ...form, ['birthdate']: birthdate })
  };

  // changes toggle to use sign up form
  function handleSignUpFormClick(e) {
    e.preventDefault();
    setFormType("users");
    setErrors([]);
  };

  // changes toggle to use login form
  function handleLoginFormClick(e) {
    e.preventDefault();
    setFormType("login");
    setErrors([]);
  };

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
        res.json().then((err) => setErrors(err.errors));
      };
    });
  };

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
                return <p key={error} className='error'>{error}</p>;
              })}
            </div>
          </form>
        </div>
      ) : (
        //signup form
        <div className="login" >
          <h1 className='login__logo'>🎶Fakeify&reg;</h1>
          <form onSubmit={handleSubmit}>
            <div className='title'>
              <h1>Sign up for some sweet tunes!</h1>
            </div>
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
              placeholder='Password 6 character minimum'
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
                value={moment(form.birthdate)}
                onChange={(e) => handleTimeChange(e)}
                inputProps={{
                  style: {
                    height: "0",
                    fontSize: '19px',
                    alignItems: 'center',
                    paddingTop: '20px',
                  },
                }}
                renderInput={(params) => <TextField
                  {...params}
                  sx={{ backgroundColor: 'white', marginBottom: '25px', borderRadius: '4px', }}
                />}
              />
            </LocalizationProvider>
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
            <div className='title'>
              <p> All fields are required! </p>
            </div>
            <div className='errordiv'>
              {errors.map((error) => {
                return <p key={error} className='error'>{error}</p>;
              })}
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Login;