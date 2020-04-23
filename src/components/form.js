import React from 'react'
import '../css/radio.css'
//import Recaptcha from 'react-google-recaptcha'

//const RECAPTCHA_KEY = process.env.GATSBY_APP_SITE_RECAPTCHA_KEY
// if (typeof RECAPTCHA_KEY === 'undefined') {
//   throw new Error(`
//   Env var GATSBY_APP_SITE_RECAPTCHA_KEY is undefined!
//   You probably forget to set it in your Netlify build environment variables.
//   Make sure to get a Recaptcha key at https://www.netlify.com/docs/form-handling/#custom-recaptcha-2-with-your-own-settings
//   Note this demo is specifically for Recaptcha v2
//   `)
// }

function Dropdowns(props) {
  var selectElements = [];
  for (var i = 1; i <= props.maskCount; i++) {
    selectElements.push(
      <div key={`select-${i}`} className="dropdown-select">
        <select>
            <option value="default">Select a mask…</option>
            {props.maskList.map((value) => {
              if (value !== null) {
                return (
                  <option key={value} value={value}>{value}</option>
                )
              }
            })}
          </select>
      </div>
    )
  }
  return (<div>{selectElements}</div>);
}

function FormItems(props) {
  const addMask = function() {
    props.setFormState(state => ({...state, maskCount: state.maskCount + 1}))
  }
  const removeMask = function() {
    if (props.formState.maskCount !== 1) {
      props.setFormState(state => ({...state, maskCount: state.maskCount - 1}))
    }
  }
  if (props.formState.status === "mask") {
    return (
      <>
        <input placeholder="Name" type="text" name="name" />
        <input placeholder="Email Address" type="email" name="email" />
        <div className="mask-control">
          <div>
            <button type="button" onClick={addMask}>Add mask</button>
            <button type="button" onClick={removeMask}>Remove last mask</button>
          </div>
          <p>{props.formState.maskCount} {props.formState.maskCount === 1 ? "mask" : "masks"} total</p>
        </div>
        <Dropdowns maskCount={props.formState.maskCount} maskList={props.maskList}/>
        <textarea placeholder="Additional Questions or Message" name="additional-message" />
        <div className="submit"><button type="submit">Send</button></div>
      </>
    )
  } else if (props.formState.status === "question") {
    return (
      <>
        <input placeholder="Name" type="text" name="name" />
        <input placeholder="Email Address" type="email" name="email" />
        <textarea placeholder="Message" name="message" />
        <div className="submit"><button type="submit">Send</button></div>
      </>
    )
  } else {
    return null;
  }
}

export default function Form(props) {
    const [state, setState] = React.useState({status: "not-decided", maskCount: 1});
    // React.useEffect(() => {console.log(`Mask count: ${state.maskCount}`)})
    return (
        <form
          name="contact-form"
          className="contactform"
          method="post"
          data-netlify="true"
          netlify-honeypot="bot-field"
        >
          <input type="hidden" name="form-name" value="contact-form"/>
          <div className="question-choice">
            <input type="radio" name="question-choice" value="wants-mask" id="yesMask" onChange={() => {setState(state => ({...state, status: "mask"}))}}/>
            <label htmlFor="yesMask">I want a mask</label>
            <input type="radio" name="question-choice" value="has-question" id="noMask" onChange={() => {setState(state => ({...state, status: "question"}))}}/>
            <label htmlFor="noMask">I have a question</label>
          </div>
          <FormItems formState={state} setFormState={setState} maskList={props.maskList}/>
        </form>
  )
}
