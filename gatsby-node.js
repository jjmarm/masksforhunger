const { fmImagesToRelative } = require('gatsby-remark-relative-images');

const remark = require("remark");
const remarkHTML = require("remark-html");

exports.onCreateNode = ({ node }) => {
  fmImagesToRelative(node);
  if (node.frontmatter.about) {
    const markdown = node.frontmatter.about;
    node.frontmatter.about = remark().use(remarkHTML).processSync(markdown).toString();
  }
};
