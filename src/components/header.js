import React from 'react'
import { Link } from 'gatsby'
import Logo from '../assets/logo.svg'
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
      navOpen: false
    }
    this.updateAnchor.bind(this);
    this.toggleNav.bind(this);
  }

  toggleNav(navOpen) {
    if (navOpen) {
      this.setState({navOpen: false})
    } else {
      this.setState({navOpen: true})
    }
  }
  updateAnchor(newState) {
    if (typeof(newState) !== 'undefined') {
        const anchorName = newState.id.slice(0, newState.id.indexOf('-container'));
        this.setState({currentAnchor: anchorName})
    }
  }

  render () {
    return (
      <div className={`outerHeader active-${this.state.currentAnchor}`}>
        <div className="header">
          <div className="header-logo">
            <Link to="/"><Logo /></Link>
          </div>
          <div className="header-menubtn" onClick={() => {this.toggleNav(this.state.navOpen)}}>
            <OpenCloseBtn navOpen={this.state.navOpen}/>
          </div>
          <Scrollspy className={`header-nav${this.state.navOpen ? " open" : ""}`} items={ ['top', 'about-container', 'instructions-container', 'catalog-container', 'contact-container'] } offset={-200} onUpdate={(e) => {this.updateAnchor(e)}} currentClassName="link-active">
            <li></li>
            <li className="link"><Link to="/#about">About</Link></li>
            <li className="link"><Link to="/#instructions">Getting a Mask</Link></li>
            <li className="link"><Link to="/#catalog">Catalog</Link></li>
            <li className="link"><Link to="/#contact">Contact</Link></li>
            <li className="link donate-wrapper"><a className="link-donate" href="https://secure.projectbread.org/site/Donation2?idb=1934012782&df_id=6233&FR_ID=1400&mfc_pref=T&PROXY_ID=2304152&PROXY_TYPE=20&6233.donation=form1&pw_id=3761&s_AffiliateSecCatId=2341&NONCE_TOKEN=0D63D32F6732BC089ED848A192544239">Donate</a></li>
          </Scrollspy>
        </div>
      </div>
    )
  }
}
