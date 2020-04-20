import React from "react"
import Layout from "../components/layout"
import { useStaticQuery, graphql, Link } from "gatsby"
import Img from "gatsby-background-image"
import DivImg from "gatsby-image"

import DownArrow from '../assets/Arrow-Down.svg'
//import ExtLink from '../assets/ext-website.svg'

import Form from "../components/form"
import "../css/index.css"

const IndexPage = ({props}) => {
  const data = useStaticQuery(graphql`
    query {
      first: file (relativePath: {eq: "hero.jpeg"}) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
      second: file (relativePath: {eq: "lyla.jpeg"}) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
      catalog: allMarkdownRemark {
        nodes {
          frontmatter {
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
  `)
  const BackgroundImageStack = [`linear-gradient(to bottom, #FF49A188, rgba(255, 0, 0, 0) 50%)`, data.first.childImageSharp.fluid]
  return (
    <Layout>
      <Img className="hero-image" fluid={BackgroundImageStack} alt="Masks for Hunger">
        <h1 className="hero-main">Help people get the food they need during the COVID-19 crisis</h1>
      <Link className="arrow-down" to="/#about">
        <DownArrow />
      </Link>
      </Img>
      <div className="grid">
        <div className="title about"><h4>About</h4></div>
        <div className="left profile about" id="about">
          <DivImg className="profile-pic" style={{backgroundAttachment: 'fixed'}} fluid={data.second.childImageSharp.fluid}/>
          <div className="profile-card"><h3>Lyla Chereau</h3><p>Grade 11 • Boston, MA</p></div>
        </div>
          <div className="right about">
            <p>In recent years I have participated in the Walk For Hunger with Project Bread, an organization that works towards ensuring that families and children have food for the weekend, and are helping to combat the global hunger crisis in our local communities.</p>
            <p>During this difficult time of crisis and isolation I have been watching my mother and her friends sew masks to donate to local hospitals to help protect people who are risking their lives for the community. </p>
            <p>Due to COVID-19, The Walk for Hunger on May 3, 2020 is cancelled but the fundraising must continue; with the being focus primarily on rapid response to food insecurity being caused by the COVID-19 crisis. </p>
            <p>I decided to be a virtual walker partnering with my mother's efforts to help the community navigate through this new environment.  I am encouraging you to donate to my fundraiser to help families that are not as fortunate as us in these times. With your generous donations we give you the opportunity to pick a mask from a selection of our beautifully homemade fabric masks. </p>
        </div>
        <div className="title catalog"><h4>Catalog</h4></div>
      <div className="catalog full" id="catalog">{data.catalog.nodes.map((node) => {
          return (
            <div className={`item${(node.frontmatter.quantity === 0) ? " out" : ""}`} key={node.frontmatter.title}>
              <Img className="item-image" fluid={node.frontmatter.image.childImageSharp.fluid} alt={node.frontmatter.title}></Img>
            <div className="item-container">
                <h3>{node.frontmatter.title}</h3>
              <p>{(node.frontmatter.quantity === 0) ? `Out of stock` : `${node.frontmatter.quantity} Masks Left`}</p>
              </div>
            </div>
          )
        })}</div>
        <div className="title contact"><h4>Contact</h4></div>
      <div className="left contact" id="contact"><p>If you wish to get a mask or have any other questions, please fill out this form or email me at <a href="mailto:lylagvideos@gmail.com">lylagvideos@gmail.com</a></p></div>
    <div className="right contact"><Form /></div>
      </div>
      <div className="donate-section"><h1>Support the movement!</h1><a href="https://secure.projectbread.org/site/Donation2?idb=1934012782&df_id=6233&FR_ID=1400&mfc_pref=T&PROXY_ID=2304152&PROXY_TYPE=20&6233.donation=form1&pw_id=3761&s_AffiliateSecCatId=2341&NONCE_TOKEN=0D63D32F6732BC089ED848A192544239" className="donate-btn">Donate now on the Walk for Hunger website →</a></div>
    </Layout>
  )
}

export default IndexPage;
