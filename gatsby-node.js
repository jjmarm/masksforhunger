const { fmImagesToRelative } = require('gatsby-remark-relative-images');

const remark = require("remark");
const remarkHTML = require("remark-html");

const { createFilePath } = require(`gatsby-source-filesystem`);
const path = require(`path`)

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  fmImagesToRelative(node);

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }

  /* if (typeof(node.frontmatter.about) !== 'undefined') {
    const markdown = node.frontmatter.about;
    node.frontmatter.about = remark().use(remarkHTML).processSync(markdown).toString();
  } */
}

exports.createPages = ({graphql, actions}) => {
  const { createPage } = actions;
  const chapterTemplate = path.resolve(`src/templates/chapter.js`);
  return graphql(`
    query loadPagesQuery {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              title
            }
          }
        }
      }
    }
  `).then((result) => {
    if (result.errors) {
      throw result.errors;
    }

    result.data.allMarkdownRemark.edges.forEach((edge) => {
        createPage({
          path: `${edge.node.fields.slug}`,
          component: chapterTemplate,
          context: {
            title: edge.node.frontmatter.title
          }
        })
    });


  })
}
