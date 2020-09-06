import React, { useState, useLayoutEffect } from "react"
import Layout from "../components/layout"
import { useStaticQuery, graphql, Link } from "gatsby"
import Img from "gatsby-background-image"
import DivImg from "gatsby-image"

import path from "path"

import { AnchorLink } from 'gatsby-plugin-anchor-links'

import DownArrow from '../assets/Arrow-Down.svg'
//import ExtLink from '../assets/ext-website.svg'

import indexStyles from "../css/index.module.css"

function makeUrlSafe(string) {
  let temp = string.toLowerCase().replace(" ", "-").toString();
  return temp;
}

function toggleSubHover(subchapterHover, setSubchapterHover) {
    if (subchapterHover) {
      setSubchapterHover(false);
    } else {
      setSubchapterHover(true)
    }
}

const IndexPage = ({props}) => {
  const [subchapterHover, setSubchapterHover] = useState(false)
  const data = useStaticQuery(graphql`
    query {
      projectBread: file (relativePath: {eq: "project-bread.png"}) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
      sanDiegoFoodBank: file (relativePath: {eq: "san-diego-food-bank.png"}) {
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
              title
              thumbnail {
                childImageSharp {
                  fluid {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
              subchapters {
                leader
                subtitle
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
      }
    }
  `)
  // BackgroundImageStack – return a portrait mode at a specific breakpoint (i.e. max-width 600px)
  return (
    <Layout>
      <div className={indexStyles.heroImage} id="top">
        <div className={indexStyles.heroMain}>
          <h1>HELPING PEOPLE GET THE FOOD THEY NEED DURING THE COVID-19 CRISIS</h1>
          <div className={indexStyles.projectImages}>
            <DivImg className={indexStyles.projectImage} fluid={data.projectBread.childImageSharp.fluid} />
            <p>×</p>
            <DivImg className={indexStyles.projectImage} fluid={data.sanDiegoFoodBank.childImageSharp.fluid} />
          </div>
        </div>
      <Link className={indexStyles.arrowDown} to="/#about">
        <DownArrow />
      </Link>
      </div>
      <div className={indexStyles.grid}>
        <span className={indexStyles.anchor} id="about"></span>
        <div className={`${indexStyles.title} ${indexStyles.about}`} id="about-container"><h4>About</h4></div>
        <div className={`${indexStyles.left} ${indexStyles.profile} ${indexStyles.about}`}>
          { data.chapters.edges.map((edge) => {
            // edge.node.frontmatter ... get image of each leader.
            return edge.node.frontmatter.subchapters.map((subchapter) => (
              <div key={subchapter.leader} className={indexStyles.profileGroup}>
                <DivImg className={indexStyles.profilePic} style={{backgroundAttachment: 'fixed'}} fluid={subchapter.profileImage.childImageSharp.fluid}/>
                <div className={indexStyles.profileCard}><h3>{subchapter.leader}</h3><p>{subchapter.subtitle}</p></div>
              </div>
            ))
          })}
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
                { edge.node.frontmatter.subchapters.length > 1 &&
                  <ul className={indexStyles.leaderList}>
                    { edge.node.frontmatter.subchapters.map((subchapter) => (
                      <li onMouseOver={() => {toggleSubHover(subchapterHover, setSubchapterHover)}} onMouseOut={() => {toggleSubHover(subchapterHover, setSubchapterHover)}} key={subchapter.leader}><Link to={path.join(edge.node.fields.slug, makeUrlSafe(subchapter.leader))}>{subchapter.leader}</Link></li>
                    )) }
                  </ul>
                }
                <p className={indexStyles.link}>{`Visit the ${subchapterHover ? 'subchapter' : 'chapter'} page →`}</p>
            </div>
          </Link>
          )
        })}</div>
    </div>
    </Layout>
  )
}

export default IndexPage;
