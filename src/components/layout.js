import React from 'react'
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"
import Header from './header'

import '../css/layout.css'

export default ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)
  return (
    <>
      <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <title>{data.site.siteMetadata.title}</title>
      </Helmet>
      <Header />
      <main>{children}</main>
      <footer>
        {new Date().getFullYear()}, Masks for Hunger. Website by <a href="http://julianm.tk">Julian Marmier.</a>
      </footer>
    </>
  )
}
