import React from 'react'
import Recaptcha from 'react-google-recaptcha'

const RECAPTCHA_KEY = process.env.GATSBY_APP_SITE_RECAPTCHA_KEY
if (typeof RECAPTCHA_KEY === 'undefined') {
  throw new Error(`
  Env var GATSBY_APP_SITE_RECAPTCHA_KEY is undefined!
  You probably forget to set it in your Netlify build environment variables.
  Make sure to get a Recaptcha key at https://www.netlify.com/docs/form-handling/#custom-recaptcha-2-with-your-own-settings
  Note this demo is specifically for Recaptcha v2
  `)
}

export default function Form() {
    return (
        <form
          name="contact-form"
          className="contactform"
          method="post"
          data-netlify="true"
          data-netlify-recaptcha="true"
        >
          <input type="hidden" name="form-name" value="contact-form"/>
          <input placeholder="Name" type="text" name="name" />
          <input placeholder="Email Address" type="email" name="email" />
          <textarea placeholder="Message" name="message" />
          <div className="submit"><Recaptcha sitekey={RECAPTCHA_KEY} /><button type="submit">Send</button></div>
        </form>
  )
}
