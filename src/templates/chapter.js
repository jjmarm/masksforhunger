import React from "react"
import Layout from "../components/layout"
import { graphql } from "gatsby"
import Img from "gatsby-background-image"
import DivImg from "gatsby-image"
import { AnchorLink } from "gatsby-plugin-anchor-links";
import {Link} from 'gatsby'

import DownArrow from '../assets/Arrow-Down.svg'

import unified from 'unified'
import parse from 'remark-parse'
import remark2react from 'remark-react'

import Form from "../components/form"
import chapterStyles from "../css/chapter.module.css"

const ChapterPage = ( props ) => {
  const {leader} = props.pageContext;

  const chapter = props.data.markdownRemark.frontmatter.subchapters.find(subchapter => subchapter.leader === leader);
  const BackgroundImageStack = [`linear-gradient(to bottom, ${chapter.colorTwo}88, rgba(255, 0, 0, 0) 50%)`, chapter.mainImage.childImageSharp.fluid]

  return (
    <Layout colors={{one: chapter.colorOne, two: chapter.colorTwo, background: chapter.backgroundColor}} data={{...props.pageContext, "donateURL": chapter.donateURL}}>
      <Img className={chapterStyles.heroImage} fluid={BackgroundImageStack} alt="Masks for Hunger">
        <h1 className={chapterStyles.heroMain} id="top">{`${chapter.header}`}</h1>
        <AnchorLink stripHash className={chapterStyles.arrowDown} to={`${props.data.markdownRemark.fields.slug}#about`}>
          <DownArrow />
        </AnchorLink>
      </Img>
      <div className={chapterStyles.grid}>
        <span className={chapterStyles.anchor} id="about"></span>
        <div className={`${chapterStyles.title} ${chapterStyles.about}`} id="about-container"><h4>About</h4></div>
        <div className={`${chapterStyles.left} ${chapterStyles.profile} ${chapterStyles.about}`}>
          <DivImg className={chapterStyles.profilePic} style={{backgroundAttachment: 'fixed'}} fluid={chapter.profileImage.childImageSharp.fluid}/>
          <div className={chapterStyles.profileCard}><h3>{chapter.leader}</h3><p>{chapter.subtitle}</p></div>
        </div>
        <div className={`${chapterStyles.right} ${chapterStyles.about}`}>
          <div>
            {
              unified()
                .use(parse)
                .use(remark2react)
                .processSync(chapter.about).result
            }
          </div>
        </div>
        <div className={`${chapterStyles.full} ${chapterStyles.about2}`}>
          <h4>THE PROGRAM</h4>
          <div className={chapterStyles.twoCol}>
            <h2><b>Masks for Hunger</b> is a student-led organization that helps people get the food they need during the COVID-19 crisis.</h2>
            <Link to="/" id="action">Learn More →</Link>
          </div>
        </div>
        <span className={chapterStyles.anchor} id="instructions"></span>
      <div className={`${chapterStyles.title} ${chapterStyles.instructions}`} id="instructions-container"><h4>Getting a Mask</h4></div>
      <div className={`${chapterStyles.instructions} ${chapterStyles.full}`}>
        <ul className={chapterStyles.maskHeader}>
          {
            chapter.features.map((entry, i) => (
              <li key={`feature-${i}`}>{entry.feature}</li>
            ))
          }
        </ul>

        <div>
          {
            unified()
              .use(parse)
              .use(remark2react)
              .processSync(chapter.maskInstructions).result
          }
        </div>
      </div>
        <span className={chapterStyles.anchor} id="catalog"></span>
        <div className={`${chapterStyles.title} ${chapterStyles.catalog}`} id="catalog-container"><h4>Catalog</h4></div>
        <div className={`${chapterStyles.catalog} ${chapterStyles.full}`}>{chapter.masks.map((mask) => {
          return (
            <div className={`${chapterStyles.item} ${(mask.quantity === 0) ? chapterStyles.out : ""}`} key={mask.title}>
              <Img className={chapterStyles.itemImage} fluid={mask.image.childImageSharp.fluid} alt={mask.title}></Img>
            <div className={chapterStyles.itemContainer}>
                <h3>{mask.title}</h3>
              <p>{(mask.quantity === 0) ? `Out of stock` : ((mask.quantity === 1) ? "1 mask left" : `${mask.quantity} masks left`)}</p>
              </div>
            </div>
          )
        })}</div>
      <div className={`${chapterStyles.title} ${chapterStyles.contact}`} id="contact-container"><h4>Contact</h4></div>
      <span className={chapterStyles.anchor} id="contact"></span>
      <div className={`${chapterStyles.left} ${chapterStyles.contact} ${chapterStyles.section}`}><p>If you wish to get a mask or have any other questions, please fill out this form or email me at <a href={`mailto:${chapter.contactEmail}`}>{chapter.contactEmail}</a></p></div>
    <div className={`${chapterStyles.right} ${chapterStyles.contact}`}><Form chapterName={chapter.title} maskList={chapter.masks.map((mask) => (mask.quantity === 0 ? null : mask.title))} /></div>
      </div>
      <div className={chapterStyles.donateSection}><h1>Support the movement!</h1><a href={chapter.donateURL} className={chapterStyles.donateBtn}>Donate now on the Walk for Hunger website →</a></div>
    </Layout>
  )
}

export default ChapterPage;

export const pageQuery = graphql`
  query chapterQuery ($leader: String) {
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
    markdownRemark(frontmatter: {subchapters: {elemMatch: {leader: {eq: $leader}}}}) {
      fields {
        slug
      }
      frontmatter {
        title
        subchapters {
          about
          backgroundColor
          colorOne
          colorTwo
          contactEmail
          features {
            feature
          }
          donateURL
          header
          leader
          subtitle
          maskInstructions
          profileImage {
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid
              }
            }
          }
          mainImage {
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid
              }
            }
          }
          masks {
            color
            quantity
            title
            image {
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
`
