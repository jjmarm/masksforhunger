const { fmImagesToRelative } = require('gatsby-remark-relative-images');

const remark = require("remark");
const remarkHTML = require("remark-html");

const { createFilePath } = require(`gatsby-source-filesystem`);
const path = require(`path`);

// const { createContentDigest } = require("gatsby-core-utils");

function makeUrlSafe(string) {
  let temp = string.toLowerCase().replace(" ", "-");
  return temp;
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField, createNode } = actions;

  fmImagesToRelative(node);

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: `slug`,
      node,
      value,
    });

    // node.frontmatter.subchapters.forEach((subchapter) => {
    //     const nodeValue = path.join(value, makeUrlSafe(subchapter.leader));
    //     createNodeField({
    //       name: `subslug-${subchapter.leader}`,
    //       node,
    //       value: nodeValue
    //     })
    // });

  }

  /* if (typeof(node.frontmatter.about) !== 'undefined') {
    const markdown = node.frontmatter.about;
    node.frontmatter.about = remark().use(remarkHTML).processSync(markdown).toString();
  } */
};

exports.createPages = ({graphql, actions}) => {
  const { createPage } = actions;
  const subchapterTemplate = path.resolve(`src/templates/chapter.js`);
  const chapterTemplate = path.resolve(`src/templates/chapterOverview.js`);
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
              subchapters {
                leader
              }
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
      if (edge.node.frontmatter.subchapters.length > 1) {
          createPage({
            path: `${edge.node.fields.slug}`,
            component: chapterTemplate,
            context: {
              title: edge.node.frontmatter.title
            }
          });

          edge.node.frontmatter.subchapters.forEach((subchapter, i) => {
            const safeUrl = makeUrlSafe(subchapter.leader);
            console.log(safeUrl);
            const slugString = path.join(edge.node.fields.slug, safeUrl);

            createPage({
              path: `${slugString}`,
              component: subchapterTemplate,
              context: {
                leader: subchapter.leader,
                slug: slugString,
                title: edge.node.frontmatter.title
              }
            });
          });
        } else {
          createPage({
            path: `${edge.node.fields.slug}`,
            component: subchapterTemplate,
            context: {
              slug: edge.node.fields.slug,
              leader: edge.node.frontmatter.subchapters[0].leader,
              title: edge.node.frontmatter.title
            }
          });
        }
      });
    });
};
