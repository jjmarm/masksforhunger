import React, { useState, useLayoutEffect } from "react"
import Layout from "../components/layout"
import { useStaticQuery, graphql, Link } from "gatsby"
import Img from "gatsby-background-image"
import DivImg from "gatsby-image"

import { AnchorLink } from 'gatsby-plugin-anchor-links'

import DownArrow from '../assets/Arrow-Down.svg'
//import ExtLink from '../assets/ext-website.svg'

import indexStyles from "../css/index.module.css"

function useWindowWidth() {
    const [width, setWidth] = useState(0);
    useLayoutEffect(() => {
      function updateSize() {
          setWidth(window.innerWidth)
      }
      window.addEventListener('resize', updateSize);
      updateSize();
      return () => window.addEventListener('resize', updateSize);
    })
    return width;
}

const IndexPage = ({props}) => {
  const data = useStaticQuery(graphql`
    query {
      first: file (relativePath: {eq: "banner-home.png"}) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
      second: file (relativePath: {eq: "banner-mobile.png"}) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
      chapters: allMarkdownRemark (sort: {order: ASC, fields: frontmatter___title}) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              leader
              subtitle
              profileImage {
                childImageSharp {
                  fluid {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
              title
              thumbnail {
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
    }
  `)
  // BackgroundImageStack – return a portrait mode at a specific breakpoint (i.e. max-width 600px)
  const windowWidth = useWindowWidth()
  return (
    <Layout>
      <Img className={indexStyles.heroImage} id="top" fluid={windowWidth < 600 ? data.second.childImageSharp.fluid : data.first.childImageSharp.fluid} alt="Masks for Hunger">
        <h1 className={indexStyles.heroMain}></h1>
      <Link className={indexStyles.arrowDown} to="/#about">
        <DownArrow />
      </Link>
      </Img>
      <div className={indexStyles.grid}>
        <span className={indexStyles.anchor} id="about"></span>
        <div className={`${indexStyles.title} ${indexStyles.about}`} id="about-container"><h4>About</h4></div>
        <div className={`${indexStyles.left} ${indexStyles.profile} ${indexStyles.about}`}>
          { data.chapters.edges.map( (edge) => (
            // edge.node.frontmatter ...
            <div key={edge.node.frontmatter.leader} className={indexStyles.profileGroup}>
              <DivImg className={indexStyles.profilePic} style={{backgroundAttachment: 'fixed'}} fluid={edge.node.frontmatter.profileImage.childImageSharp.fluid}/>
              <div className={indexStyles.profileCard}><h3>{edge.node.frontmatter.leader}</h3><p>{edge.node.frontmatter.subtitle}</p></div>
            </div>
          ))}
        </div>
        <div className={`${indexStyles.right} ${indexStyles.about}`}>
          <p>Masks for Hunger is a student-led organization pushing to diminish hunger coast-to-coast. This initiative was initially founded in Boston through Project Bread’s Walk For Hunger Campaign. Over the course of the Boston fundraiser, founded by Lyla Chereau, <a href="http://impactsinisolation.com">Impacts in Isolation</a> facilitated the opening of a new chapter in San Diego founded by Sophia Gleeson. Our aim is to create an incentive to donate towards our respective fundraisers and in return be able to receive a mask. Enjoy our home made masks and help give security to those who need it most in these times. </p>
          <p>COVID-19 does not stop HUNGER! Thank you in advance for your support!</p>
        </div>
        <span className={indexStyles.anchor} id="instructions"></span>
      <div className={`${indexStyles.title} ${indexStyles.instructions}`} id="instructions-container"><h4>Getting a Mask</h4></div>
      <div className={`${indexStyles.instructions} ${indexStyles.full}`}>
        <p>To donate or get a mask, choose the closest chapter near you from the <AnchorLink to="/#chapters" title="available list below" />.</p>
        <p>Again, you aren't required to get a mask to contribute! All remaining masks will be given to local hospitals or non-profits on the frontline.</p>
      </div>
        <span className={indexStyles.anchor} id="chapters"></span>
        <div className={`${indexStyles.title} ${indexStyles.catalog}`} id="chapters-container"><h4>Chapters</h4></div>
        <div className={`${indexStyles.catalog} ${indexStyles.full}`}>{data.chapters.edges.map((edge) => {
          return (
            <Link to={edge.node.fields.slug} id="item-link" className={indexStyles.item} key={edge.node.frontmatter.title}>
              <Img className={indexStyles.itemImage} fluid={edge.node.frontmatter.thumbnail.childImageSharp.fluid} alt={edge.node.frontmatter.title}></Img>
            <div className={indexStyles.itemContainer}>
                <h3>{edge.node.frontmatter.title}</h3>
                <p className={indexStyles.link}>Visit the chapter page →</p>
            </div>
          </Link>
          )
        })}</div>
    </div>
    </Layout>
  )
}

export default IndexPage;
