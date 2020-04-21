import React from 'react'
import { Link } from 'gatsby'
import Logo from '../assets/logo.svg'
import Scrollspy from 'react-scrollspy'

import '../css/header.css'

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentAnchor: "top"
    }
    this.updateAnchor.bind(this);
  }

  updateAnchor(newState) {
    this.setState({currentAnchor: newState.id})
  }

  render () {
    return (
      <div className={`outerHeader active-${this.state.currentAnchor}`}>
        <div className="header">
          <div className="header-logo">
            <Link to="/"><Logo /></Link>
          </div>
          <Scrollspy className="header-nav" offset={150} items={ ['top', 'about', 'catalog', 'contact'] } onUpdate={(e) => {this.updateAnchor(e)}} currentClassName="link-active">
            <li></li>
            <li><Link to="/#about">About</Link></li>
            <li><Link to="/#catalog">Catalog</Link></li>
            <li><Link to="/#contact">Contact</Link></li>
            <li><a className="link-donate" href="https://secure.projectbread.org/site/Donation2?idb=1934012782&df_id=6233&FR_ID=1400&mfc_pref=T&PROXY_ID=2304152&PROXY_TYPE=20&6233.donation=form1&pw_id=3761&s_AffiliateSecCatId=2341&NONCE_TOKEN=0D63D32F6732BC089ED848A192544239">Donate</a></li>
          </Scrollspy>
        </div>
      </div>
    )
  }
}
