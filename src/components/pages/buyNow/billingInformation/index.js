import React, { useEffect, useState } from 'react'
import InputField from '../../../atoms/InputField'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import Button from '../../../atoms/Button'
import { useDispatch, useSelector } from 'react-redux'
import { getBillingDetails } from '../../../../redux/sliceData'

function BillingInformation({ state, setState }) {

  const { fname, lname, mobile, email, address, billingCheck } = state
  // const [billingCheck, setBillingCheck] = useState(false)

  const [errors, setErrors] = useState({
    fname: '',
    lname: '',
    mobile: '',
    email: '',
  })
  const validateField = (fieldName, value) => {
    switch (fieldName) {
      case 'fname':
        const regexName = /^[a-zA-Z\s]*$/
        return value && !regexName.test(value) ? 'Invalid first name' : ''
      case 'lname':
        const regexLname = /^[a-zA-Z\s]*$/
        return value && !regexLname.test(value) ? 'Invalid last name' : ''
      case 'mobile':
        const regexMobile = /^\+?[1-9][0-9]{7,14}$/
        return value && !regexMobile.test(value) ? 'Invalid mobile number' : ''
      case 'email':
        const regexEmail = /^\S+@\S+\.\S+$/
        return value && !regexEmail.test(value) ? 'Invalid email' : ''
      case 'address':
        const addressFeild = /^(?=.*[a-zA-Z])(?=.*[0-9])[A-Za-z0-9]+$/
        // const addressFeild = /^\d+\s+[a-zA-Z\s]+\s+\w{2,}(?:\s+\d{5})?$/
        return value && !addressFeild.test(value) ? '' : ''
      default:
        return ''
    }
  }
  // const handleChange = (e) => {
  //   setState({ ...state, [e.target.name]: e.target.value })
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
  const handleCheckBox = (e) => {
    // setBillingCheck(true)
    setState((prevOrderDetails) => ({
      ...prevOrderDetails,
      [e.target.name]: e.target.checked,
    }))
  }
  return (
    <div className="row just-center">
      {/* <form onSubmit={handleSubmit}> */}
      <div className=" pt-4 product-section">
        <div className="pb-3">
          <span className="fs-3 hrstyle fw-bold">BILLING INFORMATION</span>
        </div>

        <div className="row">
          <div className="col-6">
            <InputField
              name="fname"
              value={fname}
              handleChange={handleChange}
              // disabled={disabled}
              className={'inputfieldstyle'}
              labelName={'First Name'}
            />
            {errors.fname && (
              <span style={{ color: 'red' }}>{errors.fname}</span>
            )}
          </div>
          <div className="col-6">
            <InputField
              name="lname"
              value={lname}
              handleChange={handleChange}
              // disabled={disabled}
              className={'inputfieldstyle'}
              labelName={'Last Name'}
            />
            {errors.lname && (
              <span style={{ color: 'red' }}>{errors.lname}</span>
            )}
          </div>
          <div className="col-12">
            <InputField
              name="mobile"
              value={mobile}
              handleChange={handleChange}
              // disabled={disabled}
              className={'inputfieldstyle'}
              labelName={'Mobile no.'}
            />
            {errors.mobile && (
              <span style={{ color: 'red' }}>{errors.mobile}</span>
            )}
          </div>
          <div className="col-12">
            <InputField
              name="email"
              value={email}
              handleChange={handleChange}
              // disabled={disabled}
              className={'inputfieldstyle'}
              labelName={'Email Id'}
            />
            {errors.email && (
              <span style={{ color: 'red' }}>{errors.email}</span>
            )}
          </div>

          <div className="col-12">
            <InputField
              name="address"
              value={address}
              handleChange={handleChange}
              // disabled={disabled}
              type="textarea"
              className={'inputfieldstyle textarea'}
              labelName={'Address'}
            />
            {errors.address && (
              <span style={{ color: 'red' }}>{errors.address}</span>
            )}
          </div>
        </div>
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            name="billingCheck"
            value=""
            onChange={handleCheckBox}
            id="flexCheckChecked"
          />
          <label class="form-check-label" for="flexCheckChecked">
            Do you want this to be your shipping information?
          </label>
        </div>
      </div>
      {/* </form> */}
    </div>
  )
}

export default BillingInformation
