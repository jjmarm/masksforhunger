import React from "react"
import {Link} from "gatsby"
import Layout from "../components/layout"

export default ({props}) => (
  <Layout>
    <h3>Sorry, the page you were looking for was not found.</h3>
    <p>Click <Link to="/">here</Link> to go back to the main site.</p>
  </Layout>
)
