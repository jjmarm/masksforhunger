import React from 'react'
import { Helmet } from "react-helmet"
import Header from './header'

import '../css/layout.css'

export default ({ children }) => (
  <>
    <Helmet>
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
    </Helmet>
    <Header />
    <main>{children}</main>
    <footer>
      {new Date().getFullYear()}, Masks for Hunger.
    </footer>
  </>
)
