import React from 'react';
import Layout from '../components/layout';
import { Link, graphql } from 'gatsby';
import Img from 'gatsby-background-image';

import path from "path";

import overviewStyles from '../css/overview.module.css'

function makeUrlSafe(string) {
  return string.toLowerCase().replace(" ", "-")
}

const OverviewPage = (props) => {
  // props.data contains all the stuff
  return (
    <Layout>
      <Img className={overviewStyles.heroImage} fluid={props.data.markdownRemark.frontmatter.thumbnail.childImageSharp.fluid}>
        {!props.data.markdownRemark.frontmatter.thumbnailHasText &&
          <h1 className={overviewStyles.heroHeader}>{props.data.markdownRemark.frontmatter.title}</h1>
        }
      </Img>
      <div className={overviewStyles.container}>
        { props.data.markdownRemark.frontmatter.subchapters.map(subchapter => (
          <Link key={subchapter.leader} to={path.join(props.data.markdownRemark.fields.slug, makeUrlSafe(subchapter.leader))}>
            <Img className={overviewStyles.item} fluid={subchapter.profileImage.childImageSharp.fluid}>
              <h1>{subchapter.leader}</h1>
              <p className={overviewStyles.itemLink}>Visit the subchapter page →</p>
            </Img>
          </Link>
        )) }
      </div>
    </Layout>
  )
};

export default OverviewPage;

export const pageQuery = graphql`
  query chapterOverviewQuery ($title: String) {
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
    markdownRemark(frontmatter: {title: {eq: $title}}) {
      fields {
        slug
      }
      frontmatter {
        title
        thumbnailHasText
        thumbnail {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
        subchapters {
          leader
          profileImage {
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`;
