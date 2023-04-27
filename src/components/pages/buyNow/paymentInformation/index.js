import React, { useState } from 'react'
import InputField from '../../../atoms/InputField'
import Button from '../../../atoms/Button'

function PaymentInformation({ state, setState }) {


  const { cardNO, cardName, expiration, cvv } = state
  const [errors, setErrors] = useState({
    cardNO: '',
    cardName: '',
    expiration: '',
    cvv: '',
  })

  // const handleChange=(e)=>{
  //   setState({...state,[e.target.name]:e.target.value})
  // }
  const handleChange = (e) => {
    const { name, value } = e.target
    setState((prevOrderDetails) => ({
      ...prevOrderDetails,
      [e.target.name]: e.target.value,
    }))
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validateField(name, value),
    }))
  }

  const validateField = (fieldName, value) => {
    switch (fieldName) {
      case 'cardNO':
        const regex1 = /^[0-9\.\-\/]+$/
        // const regex1 = /^4[0-9]{12}(?:[0-9]{3})?$/

        // sample card number : 4012888888881881 (visa card)

        return value && !regex1.test(value) ? 'Invalid card number' : ''
      case 'cardName':
        const regex2 = /^[a-zA-Z\s]*$/
        return value && !regex2.test(value) ? 'Invalid card name' : ''
      case 'expiration':
        // const regex3 = /^[a-zA-Z\s]*$/
        const regex3 = /^(0[1-9]|1[0-2])\/\d{2}$/
        return value && !regex3.test(value) ? 'Invalid expiry date' : ''
      case 'cvv':
        const regex4 = /^[0-9]{3,4}$/
        return value && !regex4.test(value) ? 'Invalid CVV' : ''
      default:
        return ''
    }
  }
  return (
    <div className="row just-center mt-4">
      <div className=" pt-2 product-section  pb-0 ">
        <div className="pb-3">
          <span className="fs-3 hrstyle fw-bold">PAYMENT</span>
        </div>

        <div className="row">
          <div className="col-12">
            <InputField
              name="cardNO"
              value={cardNO}
              handleChange={handleChange}
              //   disabled={disabled}
              className={'inputfieldstyle'}
              labelName={'Card Number'}
            />
            {errors.cardNO && (
              <span style={{ color: 'red' }}>{errors.cardNO}</span>
            )}
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <InputField
              name="cardName"
              value={cardName}
              handleChange={handleChange}
              //   disabled={disabled}
              className={'inputfieldstyle'}
              labelName={'Name on Card'}
            />  {errors.cardName && (
              <span style={{ color: 'red' }}>{errors.cardName}</span>
            )}

          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <InputField
              name="expiration"
              handleChange={handleChange}
              value={expiration}
              //   disabled={disabled}
              className={'inputfieldstyle'}
              labelName={'Expiration'}
            />
            {errors.expiration && (
              <span style={{ color: 'red' }}>{errors.expiration}</span>
            )}

          </div>
          <div className="col-6">
            <InputField
              name="cvv"
              handleChange={handleChange}
              value={cvv}
              //   disabled={disabled}
              className={'inputfieldstyle'}
              labelName={'Cvv'}
            />
            {errors.cvv && (
              <span style={{ color: 'red' }}>{errors.cvv}</span>
            )}
          </div>
        </div>

        <p>
          Terms and conditions{' '}
          <span style={{ color: 'blue' }}>Read more.</span>
        </p>
      </div>
      {/* </form> */}
    </div>
  )
}

export default PaymentInformation
