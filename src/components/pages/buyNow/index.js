import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowLeft,
  faArrowRight,
  faMinus,
  faPlus,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons'
import InputField from '../../atoms/InputField'
import Button from '../../atoms/Button'
import mobile from '../../../assets/mobile.png'
import ipad from '../../../assets/ipad.png'
import headphone from '../../../assets/headphone.png'
import { useSelector, useDispatch } from 'react-redux'
import {
  NewWishList,
  addCount,
  addPaymentDetails,
  addShippingDetails,
  addWishList,
  removeCount,
  removeWishListById,
  saveBillingState,
  saveCustomerDetails,
  savePaymentState,
  saveShippingState,
} from '../../../redux/sliceData'
import { useNavigate } from 'react-router-dom'
import BillingInformation from './billingInformation'
import YourProduct from './yourProduct'
import ShippingInfo from './shippingInformation'
import PaymentInformation from './paymentInformation'
import { buynowstate } from '../../constent'

function BuyNow() {
  const dispatch = useDispatch()

  const { billingInfo, shippingInfo, paymentInfo, custemerDetails } = useSelector((state) => state.data);
  const [billinfoState, setBillinfoState] = useState(billingInfo);
  const [shippingState, setShippingState] = useState(shippingInfo)
  const [paymentState, setPaymentState] = useState(paymentInfo)
  const [steps, setSteps] = useState(1)



  console.log("custemerDetails", custemerDetails);


  const nav = useNavigate()
  const [disabled, setDisabled] = useState(false)
  const [wishlistrender, setWishlistrender] = useState([])
  const wishList = useSelector((state) => state.data.wishList)
  const shippingDetails = useSelector((state) => state.data.shippingDetails)
  const [totalDiscount, setTotalDiscount] = useState('')
  const [totalPrice, setTotalPrice] = useState('')
  const [addressError, setAddressError] = useState(false)
  const [billingCheck, setBillingCheck] = useState(false)
  const [shippingCheck, setShippingCheck] = useState(false)

  const [errors, setErrors] = useState({ ...buynowstate })

  // const handleChange = (event) => {
  //   const { name, value } = event.target
  //   setOrderDetails((prevOrderDetails) => ({
  //     ...prevOrderDetails,
  //     [name]: value,
  //   }))
  //   setErrors((prevErrors) => ({
  //     ...prevErrors,
  //     [name]: validateField(name, value),
  //   }))
  // }

  const handleSubmit = () => {
    // const Arrkey = Object.keys(orderDetails)
    // Arrkey.forEach((v) => {
    //   if (orderDetails[v] == '') {
    //     setErrors((prevErrors) => ({
    //       ...prevErrors,
    //       [v]: 'Field is Required',
    //     }))
    //   } else {
    //     setErrors({ ...errors, [v]: validateField(v, orderDetails[v]) })
    //   }
    //   if (orderDetails.address === '') {
    //     setAddressError(true)
    //   }
    // })
    const errorVal = Object.values(errors)
    console.log(errorVal)

    if (errorVal.includes('')) {
      nav('/orderdetails')
      dispatch(
        addShippingDetails({
          productDetails:
            wishList.length > 1 ? wishList : shippingDetails.productDetails,
          // paymentDetails: orderDetails,
        }),
      )

      // setOrderDetails({
      //   fname: '',
      //   lname: '',
      //   mobile: '',
      //   email: '',
      //   address: '',
      //   cardNO: '',
      //   cardName: '',
      //   expiration: '',
      //   cvv: '',
      // })
      dispatch(NewWishList([]))
    }
  }

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
        const addressFeild = /^[a-zA-Z\s]*$/
        // const addressFeild = /^\d+\s+[a-zA-Z\s]+\s+\w{2,}(?:\s+\d{5})?$/
        return value && !addressFeild.test(value) ? 'Invalid address' : ''
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
  console.log(billinfoState, "billlllllllllllllllllll");
  const deleatProduct = (i) => {
    let arrVal = [...wishlistrender]
    arrVal.splice(i, 1)
    setWishlistrender(arrVal)
    dispatch(removeWishListById({ id: i }))
  }

  useEffect(() => {
    // setErrorsFun()
    const discountSum = wishList.reduce((sum, v) => {
      return sum + Number((v.price * v.discount) / 100)
    }, 0)
    console.log(discountSum)
    const totalSum = wishList.reduce((sum, v) => {
      return sum + Number(v.price)
    }, 0)
    setTotalDiscount(discountSum)
    setTotalPrice(totalSum)
    console.log(shippingDetails.paymentDetails)

    if (wishList.length === 0) {
      setDisabled(true)
    } else {
      setDisabled(false)
    }
    Object.keys(shippingDetails.paymentDetails).length !== 0 &&
      shippingDetails.paymentDetails &&
      // setOrderDetails(shippingDetails.paymentDetails)

      wishList.length > 1
      ? setWishlistrender(wishList)
      : setWishlistrender(shippingDetails.productDetails)
  }, [])

  const handleCheckBox = () => {
    setBillingCheck(true)
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
  }

  const billingFunction = () => {
    dispatch(saveBillingState(billinfoState))
    setSteps(2)
  }
  const shippingFunction = () => {

    dispatch(saveShippingState(shippingState))
    setSteps(3)
  }
  const paymentFunction = () => {
    dispatch(savePaymentState(paymentState))
    dispatch(saveCustomerDetails("save"))
    setBillinfoState(billingInfo);
    setShippingState(shippingInfo)
    setPaymentState(paymentInfo)
    nav('/orderdetails')
    // handleSubmit()
  }

  return (
    <div className="main-body" style={{ marginTop: '5.5%' }}>
      <div className="container mainCard mb-4 pt-2">
        <div
          className="fw-bold "
          style={{ color: 'blue', cursor: 'pointer' }}
          onClick={() => nav(-1)}
        >
          <p>
            {' '}
            <FontAwesomeIcon icon={faArrowLeft} /> &nbsp; Back To Shop
          </p>
        </div>
        <div className="row">
          {/* ________________________________________________________________ */}

          {/* YOur product page */}
          <div className="col-sm-7">
            <YourProduct />
          </div>

          {/* ________________________________________________________________ */}

          {/* Billing Information  page*/}
          <div className="col-sm-5 ">
            <div className="row border rounded mx-2 pb-3 ">
              {steps === 1 ? (
                <BillingInformation state={billinfoState} setState={setBillinfoState} buynowstate={buynowstate} />
              ) : steps === 2 ? (
                <ShippingInfo state={shippingState} setState={setShippingState} billinfoState={billinfoState} />
              ) : (
                <PaymentInformation state={paymentState} setState={setPaymentState} />
              )}

              <div
                className="row mt-4"
                style={{ display: 'flex', justifyContent: 'space-between' }}
              >
                {steps !== 1 && steps !== 3 && (
                  <div className="col-sm-4">
                    {' '}
                    <Button
                      name={
                        <>
                          <FontAwesomeIcon
                            icon={faArrowLeft}
                            style={{ marginRight: '5px' }}
                          />
                          Previous
                        </>
                      }
                      btnFunction={() => setSteps(steps !== 0 && steps - 1)}
                    />
                  </div>
                )}
                <div className={steps !== 2 ? 'col-sm-12' : 'col-sm-4'}>
                  {' '}
                  <Button
                    name={
                      <>
                        {steps === 3 ? (
                          'Proceed'
                        ) : (
                          <>
                            Next
                            <FontAwesomeIcon
                              icon={faArrowRight}
                              style={{ marginLeft: '5px' }}
                            />
                          </>
                        )}
                      </>
                    }
                    btnFunction={
                      steps === 1
                        ? billingFunction
                        : steps === 2
                          ? shippingFunction
                          : paymentFunction
                    }
                  // btnFunction={()=>setSteps(steps < 3 ?steps+1 : handleSubmit)}
                  />
                </div>
              </div>
            </div>
          </div>
          {/* ________________________________________________________________ */}
        </div>
        <br />
        <br />
        {/* <div className="row  ">
          <div className="col-sm-8 ">
            <div className="row just-center">
         
              <div className=" col-sm-10 ">
                <h1>SHIPPING INFORMATION</h1>

                <div className="row">
                  <div className="col-3">
                    <InputField
                      name="fname"
                      value={
                        billingCheck
                          ? orderDetails.fname
                          : billingDetails.fname1
                      }
                      handleChange={handleChange}
                      disabled={disabled}
                      className={'inputfieldstyle'}
                      labelName={'First Name'}
                    />
                    {errors.fname && (
                      <span style={{ color: 'red' }}>{errors.fname}</span>
                    )}
                  </div>
                  <div className="col-3">
                    <InputField
                      name="lname"
                      value={
                        billingCheck
                          ? orderDetails.lname
                          : billingDetails.lname1
                      }
                      handleChange={handleChange}
                      disabled={disabled}
                      className={'inputfieldstyle'}
                      labelName={'Last Name'}
                    />
                    {errors.lname && (
                      <span style={{ color: 'red' }}>{errors.lname}</span>
                    )}
                  </div>
                  <div className="col-7">
                    <InputField
                      name="mobile"
                      value={
                        billingCheck
                          ? orderDetails.mobile
                          : billingDetails.mobile1
                      }
                      handleChange={handleChange}
                      disabled={disabled}
                      className={'inputfieldstyle'}
                      labelName={'Mobile no.'}
                    />
                    {errors.mobile && (
                      <span style={{ color: 'red' }}>{errors.mobile}</span>
                    )}
                  </div>

                  <div className="col-7">
                    <InputField
                      name="address"
                      value={
                        billingCheck
                          ? orderDetails.address
                          : billingDetails.address1
                      }
                      handleChange={handleChange}
                      disabled={disabled}
                      type="textarea"
                      className={'inputfieldstyle textarea'}
                      labelName={'Address'}
                    />
                    {addressError && (
                      <span style={{ color: 'red' }}>Enter address</span>
                    )}
                  </div>
                </div>
              </div>
            
            </div>
          </div>
          <div className="col-sm-4 ">
            <div className="row just-center">
              <div className=" pt-2 product-section">
                <h1>PAYMENT</h1>

                <div className="row">
                  <div className="col-12">
                    <InputField
                      name="cardNO"
                      value={orderDetails.cardNO}
                      handleChange={handleChange}
                      disabled={disabled}
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
                      value={orderDetails.cardName}
                      handleChange={handleChange}
                      disabled={disabled}
                      className={'inputfieldstyle'}
                      labelName={'Name on Card'}
                    />
                    {errors.cardName && (
                      <span style={{ color: 'red' }}>{errors.cardName}</span>
                    )}
                  </div>
                </div>
                <div className="row">
                  <div className="col-6">
                    <InputField
                      name="expiration"
                      handleChange={handleChange}
                      value={orderDetails.expiration}
                      disabled={disabled}
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
                      value={orderDetails.cvv}
                      disabled={disabled}
                      className={'inputfieldstyle'}
                      labelName={'Cvv'}
                    />
                    {errors.cvv && (
                      <span style={{ color: 'red' }}>{errors.cvv}</span>
                    )}
                  </div>
                </div>
                <div className="mt-5">
                  <p>
                    Terms and conditions{' '}
                    <span style={{ color: 'blue' }}>Read more.</span>
                  </p>

                  <Button
                    name={wishList.length === 0 ? 'Order Details' : 'BuyNow'}
                    btnFunction={handleSubmit}
                  />
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  )
}

export default BuyNow
