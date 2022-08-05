import React, { useEffect } from 'react'
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"
import Header from './header'
import SEO from './seo'

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

  useEffect(() => {
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
  })
  return (
    <>
      <SEO />
      <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <title>{pageMetadata.site.siteMetadata.title}</title>
      </Helmet>
      <Header data={data} />
      <main className="main-body">{children}</main>
      <footer>
        © 2022, Masks for Hunger. Website by <a href="https://julianmarmier.com">Julian Marmier.</a>
      </footer>
    </>
  )
}
