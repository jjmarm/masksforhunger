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

function encode(data) {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&')
}

function Complete (props) {
  if (props.formSuccess) {
    return (<p class="form-success">Thanks for sending a message!</p>)
  } else {
    return null;
  }
}

export default function Form() {
    const [state, setState] = React.useState({})
    const recaptchaRef = React.createRef()

    const handleChange = (e) => {
      setState({ ...state, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
      e.preventDefault()
      const form = e.target
      const recaptchaValue = recaptchaRef.current.getValue()
      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({
          'form-name': form.getAttribute('name'),
          'g-recaptcha-response': recaptchaValue,
          ...state,
        }),
      }).then(() => setState({ ...state, formSuccess: true}))
      .catch((error) => alert(error))
    }

    return (
        <form
          name="contact-recaptcha"
          className="contactform"
          method="post"
          data-netlify="true"
          data-netlify-recaptcha="true"
          onSubmit={handleSubmit}
        >
          <noscript>
            <p>This form won’t work with Javascript disabled</p>
          </noscript>
          <input placeholder="Name" type="text" name="name" onChange={handleChange} />
          <input placeholder="Email Address" type="email" name="email" onChange={handleChange} />
          <textarea placeholder="Message" name="message" onChange={handleChange} />
          <div className="submit"><Recaptcha ref={recaptchaRef} sitekey={RECAPTCHA_KEY} /><button type="submit">Send</button></div>
          <Complete formSuccess={state.formSuccess}/>
        </form>
  )
}
