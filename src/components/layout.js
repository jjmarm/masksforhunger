import React from 'react'
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"
import Header from './header'

import '../css/layout.css'

export default ({ children, colors, data }) => {
  const pageMetadata = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  let root = document.documentElement;
  if (colors) {
    root.style.setProperty('--color-one', colors.one);
    root.style.setProperty('--color-two', colors.two);
    root.style.setProperty('--color-background', colors.background)
  } else {
    root.style.setProperty('--color-one', "#ff8136");
    root.style.setProperty('--color-two', "#ff49a1");
    root.style.setProperty('--color-background', "#ffe3f1");
  }

  return (
    <>
      <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <title>{pageMetadata.site.siteMetadata.title}</title>
      </Helmet>
      <Header data={data} />
      <main>{children}</main>
      <footer>
        © {new Date().getFullYear()}, Masks for Hunger. Website by <a href="http://julianm.tk">Julian Marmier.</a>
      </footer>
    </>
  )
}
