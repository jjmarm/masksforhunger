import React from "react"
import { Link, StaticQuery, graphql } from "gatsby"
import { AnchorLink } from "gatsby-plugin-anchor-links"
import Logo from "../assets/logo.svg"
import Icon from "../assets/icon.svg"
import MenuBtn from "../assets/MenuBtn.svg"
import Scrollspy from "react-scrollspy"

import "../css/header.css"

const OpenCloseBtn = props => {
  if (props.navOpen) {
    return <span>×</span>
  } else {
    return <MenuBtn />
  }
}

const LogoSelect = props => {
  return (
    <div
      className={`logo-select ${props.chaptersOpen ? "show" : ""}`}
      onBlur={props.toggleChapters}
      onMouseLeave={props.toggleChapters}
    >
      <div className="header-logo">
        <Icon className="icon" />
        <div className="logo-title">
          <h3>Masks For Hunger</h3>
          <p>{`${props.title} – ${props.leader}`}</p>
        </div>
      </div>
      <StaticQuery
        query={graphql`
          query {
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
        `}
        render={data => (
          <ul className="chapter-links">
            {data.allMarkdownRemark.edges.map(edge => (
              <li key={edge.node.frontmatter.title}>
                <AnchorLink
                  to={edge.node.fields.slug}
                  title={edge.node.frontmatter.title}
                />
              </li>
            ))}
            <li className="main-page-link">
              <Link to="/">Masks For Hunger</Link>
            </li>
          </ul>
        )}
      />
    </div>
  )
}

export default class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentAnchor: "top",
      navOpen: false,
      chaptersOpen: false,
      warningAck: false
    }

    this.updateAnchor.bind(this)
    this.toggleNav.bind(this)
    this.openChapters.bind(this)
    this.closeChapters.bind(this)
  }

  toggleWarningAck() {
    this.setState({warningAck: !this.state.warningAck})
  }

  getChaptersOpen() {
    return this.state.chaptersOpen
  }

  toggleNav(navOpen) {
    if (navOpen) {
      this.setState({ navOpen: false })
    } else {
      this.setState({ navOpen: true })
    }
  }

  openChapters = () => {
    this.setState({ chaptersOpen: true })
  }

  closeChapters = () => {
    this.setState({ chaptersOpen: false })
  }

  updateAnchor(newState) {
    if (typeof newState !== "undefined") {
      const anchorName = newState.id.slice(0, newState.id.indexOf("-container"))
      this.setState({ currentAnchor: anchorName })
    }
  }

  render() {
    // if props.data.markdownRemark is present, return page-specific data
    if (this.props["data"] !== undefined) {
      // subchapter handling
      const { leader, slug, title, donateURL } = this.props.data
      // Page-specific header
      return (
        <div className={`outerHeader active-${this.state.currentAnchor}`}>
          <div
            className={`header-note ${
              this.state.warningAck ? "invisible" : ""
            }`}
          >
            <span>As of 2022, this project is no longer active. The website will remain accessible at masksforhunger.marmier.co as an archive.</span>{" "}
            <span className="cross" onClick={() => this.setState({ warningAck: true })}>×</span>
          </div>
          <div className="header">
            <LogoSelect
              title={title}
              leader={leader}
              toggleChapters={this.closeChapters}
              chaptersOpen={this.state.chaptersOpen}
            />
            <div
              className="header-logo"
              onFocus={this.openChapters}
              onMouseEnter={this.openChapters}
            >
              <Icon className="icon" />
              <div className="logo-title">
                <h3>Masks For Hunger</h3>
                <p>{`${title} – ${leader}`}</p>
              </div>
            </div>
            <div
              className="header-menubtn"
              onClick={() => {
                this.toggleNav(this.state.navOpen)
              }}
            >
              <OpenCloseBtn navOpen={this.state.navOpen} />
            </div>
            <Scrollspy
              className={`header-nav${this.state.navOpen ? " open" : ""}`}
              items={[
                "top",
                "about-container",
                "instructions-container",
                "catalog-container",
                "contact-container",
              ]}
              offset={-200}
              onUpdate={e => {
                this.updateAnchor(e)
              }}
              currentClassName="link-active"
            >
              <li></li>
              <li className="link">
                <AnchorLink stripHash to={`${slug}#about`}>
                  About
                </AnchorLink>
              </li>
              <li className="link">
                <AnchorLink stripHash to={`${slug}#instructions`}>
                  Getting a Mask
                </AnchorLink>
              </li>
              <li className="link">
                <AnchorLink stripHash to={`${slug}#catalog`}>
                  Catalog
                </AnchorLink>
              </li>
              <li className="link">
                <AnchorLink stripHash to={`${slug}#contact`}>
                  Contact
                </AnchorLink>
              </li>
              <li className="link donate-wrapper">
                <a className="link-donate" target="_blank" href={donateURL}>
                  Donate
                </a>
              </li>
            </Scrollspy>
          </div>
        </div>
      )
    } else {
      // Main Page & 404 Header
      return (
        <div
          className={`outerHeader active-${this.state.currentAnchor} index-header`}
        >
          <div
            className={`header-note ${
              this.state.warningAck ? "invisible" : ""
            }`}
          >
            <span>As of 2022, this project is no longer active. The website will remain accessible at masksforhunger.marmier.co as an archive.</span>{" "}
            <span className="cross" onClick={() => this.setState({ warningAck: true })}>×</span>
          </div>
          <div className="header">
            <div className="header-logo">
              <Link to="/">
                <Logo />
              </Link>
            </div>
            <div
              className="header-menubtn"
              onClick={() => {
                this.toggleNav(this.state.navOpen)
              }}
            >
              <OpenCloseBtn navOpen={this.state.navOpen} />
            </div>
            <Scrollspy
              className={`header-nav${this.state.navOpen ? " open" : ""}`}
              items={[
                "top",
                "about-container",
                "instructions-container",
                "chapters-container",
              ]}
              offset={-200}
              onUpdate={e => {
                this.updateAnchor(e)
              }}
              currentClassName="link-active"
            >
              <li></li>
              <li className="link">
                <AnchorLink stripHash to="/#about">
                  About
                </AnchorLink>
              </li>
              <li className="link">
                <AnchorLink stripHash to="/#instructions">
                  Getting a Mask
                </AnchorLink>
              </li>
              <li className="link">
                <AnchorLink stripHash to="/#chapters">
                  Chapters
                </AnchorLink>
              </li>
              <li className="link donate-wrapper">
                <AnchorLink stripHash className="link-donate" to="/#chapters">
                  Find your chapter
                </AnchorLink>
              </li>
            </Scrollspy>
          </div>
        </div>
      )
    }
  }
}
