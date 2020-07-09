import React from 'react'
import { Link } from 'gatsby'
import { AnchorLink } from 'gatsby-plugin-anchor-links'
import Logo from '../assets/logo.svg'
import Icon from '../assets/icon.svg'
import MenuBtn from '../assets/MenuBtn.svg'
import Scrollspy from 'react-scrollspy'

import '../css/header.css'

const OpenCloseBtn = (props) => {
  if (props.navOpen) {
    return (<span>×</span>)
  } else {
    return (<MenuBtn />)
  }
}

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentAnchor: "top",
      navOpen: false,
      chaptersOpen: false
    }

    this.updateAnchor.bind(this);
    this.toggleNav.bind(this);
    this.toggleChapters.bind(this);
  }

  toggleNav(navOpen) {
    if (navOpen) {
      this.setState({navOpen: false})
    } else {
      this.setState({navOpen: true})
    }
  }

  toggleChapters(chaptersOpen) {
    chaptersOpen ? this.setState({chaptersOpen: false}) : this.setState({chaptersOpen: true});
  }

  updateAnchor(newState) {
    if (typeof(newState) !== 'undefined') {
        const anchorName = newState.id.slice(0, newState.id.indexOf('-container'));
        this.setState({currentAnchor: anchorName})
    }
  }

  render () {
    // if props.data.markdownRemark is present, return page-specific data
    if (this.props["data"] !== undefined ) {
      const chapter = this.props.data.markdownRemark.frontmatter;
      const slug = this.props.data.markdownRemark.fields.slug;
      // Page-specific header
      return (
        <div className={`outerHeader active-${this.state.currentAnchor}`}>
          <div className="header">
            <div className={`logo-select ${this.state.chaptersOpen ? ' show' : ''}`} onMouseOut={() => {console.log("mouseout"); this.toggleChapters(this.state.chaptersOpen)}}>
              <div className="header-logo">
                <Icon className="icon"/>
                <div className="logo-title">
                  <h3>Masks For Hunger</h3>
                  <p>{chapter.title}</p>
                </div>
              </div>
                <ul className="chapter-links">{this.props.data.allMarkdownRemark.edges.map((edge) => (
                    <li key={edge.node.frontmatter.title}><AnchorLink to={edge.node.fields.slug} title={edge.node.frontmatter.title} /></li>
                  ))}
                  <li className="main-page-link"><Link to="/">Masks For Hunger</Link></li>
                </ul>
            </div>

            <div className="header-logo" onMouseOver={() => {this.toggleChapters(this.state.chaptersOpen)}}>
              <Icon className="icon"/>
              <div className="logo-title">
                <h3>Masks For Hunger</h3>
                <p>{chapter.title}</p>
              </div>
            </div>
            <div className="header-menubtn" onClick={() => {this.toggleNav(this.state.navOpen)}}>
              <OpenCloseBtn navOpen={this.state.navOpen}/>
            </div>
            <Scrollspy className={`header-nav${this.state.navOpen ? " open" : ""}`} items={ ['top', 'about-container', 'instructions-container', 'catalog-container', 'contact-container'] } offset={-200} onUpdate={(e) => {this.updateAnchor(e)}} currentClassName="link-active">
              <li></li>
              <li className="link"><AnchorLink stripHash to={`${slug}#about`}>About</AnchorLink></li>
              <li className="link"><AnchorLink stripHash to={`${slug}#instructions`}>Getting a Mask</AnchorLink></li>
              <li className="link"><AnchorLink stripHash to={`${slug}#catalog`}>Catalog</AnchorLink></li>
              <li className="link"><AnchorLink stripHash to={`${slug}#contact`}>Contact</AnchorLink></li>
              <li className="link donate-wrapper"><a className="link-donate" href={chapter.donateURL}>Donate</a></li>
            </Scrollspy>
          </div>
        </div>
      )
    } else {
      // Main Page & 404 Header
      return (
        <div className={`outerHeader active-${this.state.currentAnchor}`}>
          <div className="header">
            <div className="header-logo">
              <Link to="/"><Logo /></Link>
            </div>
            <div className="header-menubtn" onClick={() => {this.toggleNav(this.state.navOpen)}}>
              <OpenCloseBtn navOpen={this.state.navOpen}/>
            </div>
            <Scrollspy className={`header-nav${this.state.navOpen ? " open" : ""}`} items={ ['top', 'about-container', 'instructions-container', 'chapters-container', 'contact-container'] } offset={-200} onUpdate={(e) => {this.updateAnchor(e)}} currentClassName="link-active">
              <li></li>
              <li className="link"><AnchorLink to="/#about">About</AnchorLink></li>
              <li className="link"><AnchorLink stripHash to="/#instructions">Getting a Mask</AnchorLink></li>
              <li className="link"><AnchorLink stripHash to="/#chapters">Chapters</AnchorLink></li>
              <li className="link"><AnchorLink stripHash to="/#contact">Contact</AnchorLink></li>
              <li className="link donate-wrapper"><AnchorLink stripHash className="link-donate" to="/#chapters">Find your chapter</AnchorLink></li>
            </Scrollspy>
          </div>
        </div>
      )
    }
  }
}
