/**
* Configure your Gatsby site with this file.
*
* See: https://www.gatsbyjs.org/docs/gatsby-config/
*/

module.exports = {
  siteMetadata: {
    title: `Masks for Hunger`,
    author: {
      name: `Lyla Chereau`,
      summary: `Boston, MA`
    },
    description: `Supporting food pantries through masks`,
    siteurl: `https://masksforhunger.com`
  },
  plugins: [
    `gatsby-plugin-netlify-cms`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /assets/ // See below to configure properly
        }
      }
    },
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/assets/`
      }
    }
  ],

}
