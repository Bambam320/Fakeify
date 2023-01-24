import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import {Helmet} from "react-helmet";

  // sets the style of the background image
  const backgroundStyle = {
    background: 'linear-gradient(217deg, rgba(0,0,0,.8), rgba(0,0,0,0) 99%), linear-gradient(127deg, rgba(0,0,0,.8), rgba(20, 20, 20,0) 99%), linear-gradient(336deg, rgba(20, 20, 20,.8), rgba(20, 20, 20,0) 99%)',
    // minHeight: '75em',
    height: 'auto',
    width: 'auto',
  };

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
       <div style={ backgroundStyle }>
       <Helmet>
                <meta charSet="utf-8" />
                <title>Spotify Clone</title>
                <link rel="canonical" href="http://mysite.com/example" />
                <meta name="description" content="Helmet application" />
            </Helmet>
      <App />
      </div>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
