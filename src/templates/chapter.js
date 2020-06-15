import React from "react"
import Layout from "../components/layout"
import { useStaticQuery, graphql, Link } from "gatsby"
import Img from "gatsby-background-image"
import DivImg from "gatsby-image"

import DownArrow from '../assets/Arrow-Down.svg'
//import ExtLink from '../assets/ext-website.svg'

import Form from "../components/form"
import "../css/index.css"

const ChapterPage = ({props}) => {
  const data = useStaticQuery(graphql`
    query chapterQuery($title: String) {
      chapter: markdownRemark(frontmatter: {title: {eq: $title}}) {
        frontmatter {
          title
          about
          backgroundColor
          colorOne
          colorTwo
          contactEmail
          donateURL
          header
          leader
          subtitle
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
  `)
  const chapter = data.chapter.frontmatter;
  const BackgroundImageStack = [`linear-gradient(to bottom, ${chapter.colorTwo}88, rgba(255, 0, 0, 0) 50%)`, chapter.mainImage.childImageSharp.fluid]
  return (
    <Layout>
      <Img className="hero-image" fluid={BackgroundImageStack} alt="Masks for Hunger">
        <h1 className="hero-main" id="top">{chapter.header}</h1>
        <Link className="arrow-down" to="#about">
          <DownArrow />
        </Link>
      </Img>
      <div className="grid">
        <span className="anchor" id="about"></span>
        <div className="title about" id="about-container"><h4>About</h4></div>
        <div className="left profile about">
          <DivImg className="profile-pic" style={{backgroundAttachment: 'fixed'}} fluid={chapter.profileImage.childImageSharp.fluid}/>
          <div className="profile-card"><h3>{chapter.leader}}</h3><p>{chapter.subtitle}</p></div>
        </div>
        <div className="right about">
          {chapter.about}
        </div>
        <span className="anchor" id="instructions"></span>
      <div className="title instructions" id="instructions-container"><h4>Getting a Mask</h4></div>
      <div className="instructions full">
        <ul className="mask-header">
          <li>Made from 100% cotton</li>
          <li>Elastic loop around the ears</li>
          <li>Small pocket to insert a filter if desired</li>
        </ul>
        <p>Masks for Hunger is an initiative to raise awareness about food for all during this crisis. You're welcome to donate without getting a mask. Just <a href="https://secure.projectbread.org/site/Donation2?idb=1934012782&df_id=6233&FR_ID=1400&mfc_pref=T&PROXY_ID=2304152&PROXY_TYPE=20&6233.donation=form1&pw_id=3761&s_AffiliateSecCatId=2341&NONCE_TOKEN=0D63D32F6732BC089ED848A192544239">click here</a> to donate!</p>
        <p>However, if you do wish to get a mask, just follow these simple steps:</p>
        <ol>
          <li><a href={chapter.donateURL}>Make a donation on the Walk for Hunger website</a>. A pledge of at least $25 is recommended to get a mask.</li>
          <li>Browse the selection of masks <Link to="#catalog">on the catalog</Link>.</li>
          <li>Tell me which masks you would like by submitting the <Link to="#contact">contact form</Link> below, or send me an email with your name, address (if you would like me to deliver to you), and the masks you would like. Submit two separate forms if you would like more than 8.</li>
          <li>You should receieve a response by mail from me shortly.</li>
        </ol>
        <p>Again, you aren't required to get a mask to contribute! All remaining masks will be given to local hospitals or non-profits on the frontline.</p>
      </div>
        <span className="anchor" id="catalog"></span>
        <div className="title catalog" id="catalog-container"><h4>Catalog</h4></div>
        <div className="catalog full">{chapter.masks.map((mask) => {
          return (
            <div className={`item${(mask.quantity === 0) ? " out" : ""}`} key={mask.title}>
              <Img className="item-image" fluid={mask.image.childImageSharp.fluid} alt={mask.title}></Img>
            <div className="item-container">
                <h3>{mask.title}</h3>
              <p>{(mask.quantity === 0) ? `Out of stock` : ((mask.quantity === 1) ? "1 mask left" : `${mask.quantity} masks left`)}</p>
              </div>
            </div>
          )
        })}</div>
        <div className="title contact" id="contact-container"><h4>Contact</h4></div>
      <span className="anchor" id="contact"></span>
      <div className="left contact section"><p>If you wish to get a mask or have any other questions, please fill out this form or email me at <a href={`mailto:${chapter.contactEmail}`}>{chapter.contactEmail}</a></p></div>
    <div className="right contact"><Form maskList={chapter.masks.map((mask) => (mask.quantity === 0 ? null : mask.title))} /></div>
      </div>
      <div className="donate-section"><h1>Support the movement!</h1><a href={chapter.donateURL} className="donate-btn">Donate now on the Walk for Hunger website →</a></div>
    </Layout>
  )
}

export default ChapterPage;
