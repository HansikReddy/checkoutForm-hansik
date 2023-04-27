import React, { useState } from 'react'
import InputField from '../../../atoms/InputField'

function ShippingInfo({ state, setState, billinfoState }) {

  const { fname, lname, mobile, address } = state
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

  return (
    <div className="row just-center mt-4">
      <div className=" col-sm-12 ">
        <div className="pb-3">
          <span className="fs-3 hrstyle fw-bold">SHIPPING INFORMATION</span>
        </div>

        <div className="row">
          <div className="col-6">
            <InputField
              name="fname"
              // value={fname}
              value={billinfoState.billingCheck ? billinfoState.fname : fname}
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
              value={billinfoState.billingCheck ? billinfoState.lname : lname}
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
              value={billinfoState.billingCheck ? billinfoState.mobile : mobile}
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
              name="address"
              value={billinfoState.billingCheck ? billinfoState.address : address}
              handleChange={handleChange}
              // disabled={disabled}
              type="textarea"
              className={'inputfieldstyle textarea'}
              labelName={'Address'}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShippingInfo
