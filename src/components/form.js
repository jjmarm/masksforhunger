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


// components

function MaxBtn (props) {
  if (props.maskCount >= 8) {
      return (<p>Mask limit reached</p>)
    } else {
      return (
        <button type="button" onClick={props.addMask}>Add mask</button>
      )
    }
}

function Dropdowns(props) {
  var selectElements = [];
  for (var i = 1; i <= props.maskCount; i++) {
    selectElements.push(
      <div key={`select-${i}`} className="dropdown-select">
        <select name={`select${i}`} onBlur={props.updateFormValues}>
            <option value="default">Select a mask…</option>
            {props.maskList.map((value) => {
              if (value !== null) {
                return (
                  <option key={value} value={value}>{value}</option>
                )
              } else {
                return null;
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
      let currentCount = props.formState.maskCount;
      props.setFormState(state => ({...state, maskCount: state.maskCount - 1, values: {...state.values, [`select${currentCount}`]: "none"}}))
    }
  }
  if (props.formState.status === "mask") {
    return (
      <>
        <input placeholder="Name" type="text" name="name" onChange={props.updateFormValues} />
        <input placeholder="Email Address" type="email" name="email" onChange={props.updateFormValues} />
        <input type="text" placeholder="Your Address (leave this blank for pick-up)" name="address" />
        <div className="mask-control">
          <div>
            <MaxBtn addMask={addMask} maskCount={props.formState.maskCount}/>
            <button type="button" onClick={removeMask}>Remove last mask</button>
          </div>
          <p>{props.formState.maskCount} {props.formState.maskCount === 1 ? "mask" : "masks"} total</p>
        </div>
        <Dropdowns maskCount={props.formState.maskCount} updateFormValues={props.updateFormValues} maskList={props.maskList}/>
        <textarea placeholder="Additional Questions or Message" name="message" onChange={props.updateFormValues} />
        <div className="submit"><button type="submit">Send</button></div>
      </>
    )
  } else if (props.formState.status === "question") {
    return (
      <>
        <input placeholder="Name" type="text" name="name" onChange={props.updateFormValues} />
        <input placeholder="Email Address" type="email" name="email" onChange={props.updateFormValues} />
        <textarea placeholder="Message" name="message" onChange={props.updateFormValues} />

        <div className="submit"><button type="submit">Send</button></div>
      </>
    )
  } else {
    return null;
  }
}

export default function Form(props) {
    const encode = (data) => {
      return Object.keys(data)
          .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
          .join("&");
    }

    function updateFormValues(event) {
      let target = event.target;
      setState(state => ({...state, values: {...state.values, [target.name]: target.value}}))
    }

    function handleSubmit (e, state) {
      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({ "form-name": "contact-form", "mask-quantity": state.maskCount, ...state.values })
      })
        .then(() => alert("Success!"))
        .catch(error => alert(error));

      e.preventDefault();
    };

    const [state, setState] = React.useState({status: "not-decided", maskCount: 1, values: {}});
    // React.useEffect(() => {console.log(`Mask count: ${state.maskCount}`)})
    return (
      <>
        <form
          className="contactform"
          id="contactform"
          onSubmit={(e) => {handleSubmit(e, state)}}
        >
          <div className="question-choice">
            <input type="radio" name="question-choice" value="wants-mask" id="yesMask" onChange={() => {setState(state => ({...state, status: "mask", values: {...state.values, "question-choice" : "wants-mask"}}) )}}/>
            <label htmlFor="yesMask">I want a mask</label>
            <input type="radio" name="question-choice" value="has-question" id="noMask" onChange={() => {setState(state => ({...state, status: "question", values: {...state.values, "question-choice" : "wants-mask"}}) )}}/>
            <label htmlFor="noMask">I have a question</label>
          </div>
          <FormItems formState={state} setFormState={setState} maskList={props.maskList} updateFormValues={updateFormValues}/>
        </form>

        <form name="contact-form" data-netlify="true" netlify-honeypot="bot-field" style={{display: "none"}}>
          <input type="hidden" name="form-name" value="contact-form"/>
          <input name="bot-field"/>
          <input type="text" placeholder="Address" name="address" />
          <input type="radio" name="question-choice" value="wants-mask" id="yesMask"/>
          <input type="radio" name="question-choice" value="has-question" id="noMask"/>
          <input placeholder="Name" type="text" name="name" />
          <input placeholder="Email Address" type="email" name="email" />
          <input type="number" name="mask-quantity"/>
          <textarea placeholder="Message" name="message" />
          <select name="select1">
              <option value="default">Select a mask…</option>
          </select>
          <select name="select2">
              <option value="none"></option>
          </select>
          <select name="select3">
              <option value="none"></option>
          </select>
          <select name="select4">
              <option value="none"></option>
          </select>
          <select name="select5">
              <option value="none"></option>
          </select>
          <select name="select6">
              <option value="none"></option>
          </select>
          <select name="select7">
              <option value="none"></option>
          </select>
          <select name="select8">
              <option value="none"></option>
          </select>
        </form>
      </>
  )
}
