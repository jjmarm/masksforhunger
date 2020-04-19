import React from "react"
import Layout from "../components/layout"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-background-image"
import DivImg from "gatsby-image"

import DownArrow from '../assets/Arrow-Down.svg'

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
    }
  `)
  const BackgroundImageStack = [`linear-gradient(to bottom, #FF49A188, rgba(255, 0, 0, 0) 50%)`, data.first.childImageSharp.fluid]
  return (
    <Layout>
      <Img className="hero-image" fluid={BackgroundImageStack} alt="Masks for Hunger">
        <h1 className="hero-main">Help people get the food they need during the COVID-19 crisis</h1>
        <div className="arrow-down">
          <DownArrow />
        </div>
      </Img>
      <div className="grid">
        <div className="title"><h4>About</h4></div>
      <div className="left profile" id="about">
        <DivImg className="profile-pic" fluid={data.second.childImageSharp.fluid}/>
      <div className="profile-card"><h3>Lyla Chereau</h3><p>Grade 11 • Boston, MA</p></div>
      </div>
        <div className="right">
          <p>In recent years I have participated in the Walk For Hunger with Project Bread, an organization that works towards ensuring that families and children have food for the weekend, and are helping to combat the global hunger crisis in our local communities.</p>
          <p>During this difficult time of crisis and isolation I have been watching my mother and her friends sew masks to donate to local hospitals to help protect people who are risking their lives for the community. </p>
          <p>Due to COVID-19, The Walk for Hunger on May 3, 2020 is cancelled but the fundraising must continue; with the being focus primarily on rapid response to food insecurity being caused by the COVID-19 crisis. </p>
          <p>I decided to be a virtual walker partnering with my mother's efforts to help the community navigate through this new environment.  I am encouraging you to donate to my fundraiser to help families that are not as fortunate as us in these times. With your generous donations we give you the opportunity to pick a mask from a selection of our beautifully homemade fabric masks. </p>
        </div>
      </div>
    </Layout>
  )
}

export default IndexPage;
