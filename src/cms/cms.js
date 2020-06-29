import React, { createElement } from "react";

import CMS from "netlify-cms";
import * as ColorWidget from "netlify-cms-widget-color";

CMS.registerWidget("color", ColorWidget.Control);

class PreviewComponent extends React.Component {
  render() {
    var entry = this.props.entry;
    // Passing all data to props
    var title = entry.getIn(['data', 'title']);
    var mainImage = this.props.getAsset(entry.getIn(['data', 'mainImage'])).toString();
    var mainText = entry.getIn(['data', 'header']);
    var profileImage = this.props.getAsset(entry.getIn(['data', 'profileImage'])).toString();
    var aboutText = entry.getIn(['data', 'about']);
    var leader = entry.getIn(['data', 'leader']);
    var subtitle = entry.getIn(['data', 'subtitle']);
    var donateURL = entry.getIn(['data', 'donateURL']);
    var mainColorA = entry.getIn(['data', 'colorOne']);
    var mainColorB = entry.getIn(['data', 'colorTwo']);
    var backgroundColor = entry.getIn(['data', 'backgroundColor']);
    var email = entry.getIn(['data', 'contactEmail']);
    // var maskList = entry.getIn(['data', 'masks']);

    // not sure if this will work, needs testing…

    const listItems = this.props.widgetsFor('features').map((feature, index) => (
      createElement('li', {key: index}, feature.getIn(['data','feature']);
    ))

    if (mainColorA === "#ffffff" && backgroundColor === "#ffffff") {
      mainColorA = "#000"
    }

    return createElement('div', {className: "body", style: {backgroundColor: backgroundColor, color: mainColorA}},
      createElement('object', {type:'image/svg+xml', data:'/logo.svg', style: {fill: mainColorA}}),
      createElement('h1', {}, title),
      createElement('h1', {className: "main-image", style: {backgroundImage: `url(${mainImage})`}}, mainText),
      createElement('h2', {}, "About"),
      createElement('div', {className: "about"},
        createElement('div', {className: "profile-container"}, createElement('img', {src: profileImage}),
          createElement('div', {className: "profile-title"}, createElement('h2', {}, leader), createElement('h3', {}, subtitle)) ),
        createElement('p', {}, aboutText)
      ),
      createElement('h2', {}, "Getting a mask"),
      createElement('ul', {className: "mask-list"},  listItems ),
      createElement('a', {href: donateURL, style: {backgroundColor: mainColorA}}, "Donate"),
      createElement('h2', {style: {color: mainColorB}}, "Contact (Second main color)"),
      createElement('a', {style: {color: mainColorB, borderBottomColor: mainColorB, backgroundColor: mainColorB + "33"}, className: "email-link", href: `mailto: ${email}`}, "Reach me at " + email)
    )
  }
}

/*
const PreviewComponent = createClass({
  render: function() {
    var entry = this.props.entry;
    // Passing all data to props
    var title = entry.getIn(['data', 'title']);
    var mainImage = this.props.getAsset(entry.getIn(['data', 'mainImage'])).toString();
    var profileImage = this.props.getAsset(entry.getIn(['data', 'profileImage'])).toString();
    var aboutText = entry.getIn(['data', 'about']);
    var leader = entry.getIn(['data', 'leader']);
    var subtitle = entry.getIn(['data', 'subtitle']);
    var donateURL = entry.getIn(['data', 'donateURL']);
    var mainColorA = entry.getIn(['data', 'colorOne']);
    var mainColorB = entry.getIn(['data', 'colorTwo']);
    var backgroundColor = entry.getIn(['data', 'backgroundColor']);
    // var maskList = entry.getIn(['data', 'masks']);

    // not sure if this will work, needs testing…

    if (mainColorA === "#ffffff" && backgroundColor === "#ffffff") {
      mainColorA = "#000"
    }

    return createElement('div', {style: {backgroundColor: backgroundColor, color: mainColorA}},
      createElement('h1', {}, title),
      createElement('p', {}, aboutText),
      createElement('img', {className: "main-image", src: mainImage}),
      createElement('div', {className: "profile-container"}, createElement('img', {src: profileImage}),
        createElement('div', {className: "profile-title"}, createElement('h2', {}, leader), createElement('h3', {}, subtitle)) ),
      createElement('a', {href: donateURL, style: {backgroundColor: mainColorA}}),
      createElement('h2', {style: {color: mainColorB}}, "Contact (Second main color)")
    )
  }
}) */

CMS.registerPreviewStyle('/cms.css');
CMS.registerPreviewTemplate("chapters", PreviewComponent);
