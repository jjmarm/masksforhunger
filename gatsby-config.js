/**
* Configure your Gatsby site with this file.
*
* See: https://www.gatsbyjs.org/docs/gatsby-config/
*/

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})


module.exports = {
  siteMetadata: {
    title: `Masks for Hunger`,
    author: `Lyla Chereau`,
    description: `A student-driven organization fighting hunger during the COVID-19 crisis.`,
    siteUrl: `https://masksforhunger.com`
  },
  plugins: [
    {
      resolve: `gatsby-plugin-netlify-cms`,
      options: {
        modulePath: `${__dirname}/src/cms/cms.js`
      }
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /assets/ // See below to configure properly
        }
      }
    },
    `gatsby-plugin-anchor-links`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/static/assets/`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `markdown-pages`,
        path: `${__dirname}/chapters/`
      }
    },
    {
        resolve: `gatsby-transformer-remark`,
        options: {
          plugins: [
            {
                resolve: `gatsby-remark-relative-images`,
            },
            {
              resolve: `gatsby-remark-images`,
              options: {
                maxWidth: 600,
              }
            }
          ]
        }
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-164187797-1",
      }
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        exclude: [`/admin/*`],
        createLinkInHead: true
      }
    }
  ],

}
