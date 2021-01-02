import React, { createElement } from "react";

import CMS from "netlify-cms-app";
import * as ColorWidget from "netlify-cms-widget-color";

CMS.registerWidget("color", ColorWidget.Control);

class PreviewComponent extends React.Component {
  render() {
    var entry = this.props.entry;
    // all data comes from props
    var title = entry.getIn(['data', 'title']);

    // NEW subchapters. everything except title and thumbnail are there.
    // var subchapters = entry.getIn(['data', 'subchapters'])

    const subchapters = this.props.widgetsFor('subchapters').map((subchapter, i) => {
      const mainImage = this.props.getAsset(subchapter.getIn(['data', 'mainImage'])).toString();
      const mainText = subchapter.getIn(['data', 'header']);
      const profileImage = this.props.getAsset(subchapter.getIn(['data', 'profileImage'])).toString();
      const aboutText = subchapter.getIn(['data', 'about']);
      const leader = subchapter.getIn(['data', 'leader']);
      const subtitle = subchapter.getIn(['data', 'subtitle']);
      const instructionsText = subchapter.getIn(['data', 'maskInstructions'])
      const donateURL = subchapter.getIn(['data', 'donateURL']);
      let mainColorA = subchapter.getIn(['data', 'colorOne']);
      const mainColorB = subchapter.getIn(['data', 'colorTwo']);
      const backgroundColor = subchapter.getIn(['data', 'backgroundColor']);
      const email = subchapter.getIn(['data', 'contactEmail']);

      if (subchapter.getIn(['data', 'masks'])) {
        var maskList = subchapter.getIn(['data', 'masks']).map((mask, index) => {
          const maskImage = this.props.getAsset(mask.get('image')), maskTitle = mask.get('title'), maskQuantity = mask.get('quantity');
          var finalMaskQuanity = "";
          if (maskQuantity === 0) {
            finalMaskQuanity = "Out of stock"
          } else {
            finalMaskQuanity = `${maskQuantity} masks left`;
          }
          return createElement('li', {key: index, className: 'mask-item'},
            createElement('img', {src: maskImage}),
            createElement('h3', {}, maskTitle),
            createElement('p', finalMaskQuanity)
          )
        });
      } else {
        var maskList = null;
      }

      const listItems = subchapter.getIn(['data', 'features']).map((feature, index) => {
          return createElement('li', {key: index}, feature.get('feature'))
      });

      if (mainColorA === "#ffffff" && backgroundColor === "#ffffff") {
          mainColorA = "#000"
      }

      return createElement('div', {key: i, className: "body", style: {backgroundColor: backgroundColor, color: mainColorA}},
        createElement('object', {type:'image/svg+xml', data:'/logo.svg', style: {fill: mainColorA}}),
        createElement('h1', {}, `${title} • ${leader}`),
        createElement('h1', {className: "main-image", style: {backgroundImage: `url(${mainImage})`}}, mainText),
        createElement('h2', {}, "About"),
        createElement('div', {className: "about"},
          createElement('div', {className: "profile-container"}, createElement('img', {src: profileImage}),
            createElement('div', {className: "profile-title"}, createElement('h2', {}, leader), createElement('h3', {}, subtitle)) ),
          createElement('p', {}, aboutText)
        ),
        createElement('h2', {}, "Getting a mask"),
        createElement('ul', {className: "mask-list"},  listItems ),
        createElement('p', {}, instructionsText),
        createElement('h2', {}, "Masks"),
        createElement('ul', {className: "mask-list mask-catalog"},
          maskList
        ),
        createElement('a', {href: donateURL, style: {backgroundColor: mainColorA}}, "Donate"),
        createElement('h2', {style: {color: mainColorB}}, "Contact (Second main color)"),
        createElement('a', {style: {color: mainColorB, borderBottomColor: mainColorB, backgroundColor: mainColorB + "33"}, className: "email-link", href: `mailto: ${email}`}, "Reach me at " + email)
      )
    });

    return createElement('div', {className: "wrapper"},
      createElement('div', {},
        // show something here about the whole chapter.
        createElement('h2', `Masks for Hunger ${title}`),
      ),
      subchapters,
    );

    /*
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
      createElement('p', {}, instructionsText),
      createElement('a', {href: donateURL, style: {backgroundColor: mainColorA}}, "Donate"),
      createElement('h2', {style: {color: mainColorB}}, "Contact (Second main color)"),
      createElement('a', {style: {color: mainColorB, borderBottomColor: mainColorB, backgroundColor: mainColorB + "33"}, className: "email-link", href: `mailto: ${email}`}, "Reach me at " + email)
    ) */
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
