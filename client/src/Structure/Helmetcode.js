import React from 'react'
import { Helmet } from "react-helmet-async";

function Helmetcode() {
  return (
    <Helmet>
      <meta charSet="utf-8" />
      <title>Spotify Clone</title>
      <link rel="canonical" href="http://mysite.com/example" />
      <meta name="description" content="Helmet application" />
    </Helmet>
  )
}

export default Helmetcode