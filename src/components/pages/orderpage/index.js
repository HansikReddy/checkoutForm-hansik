import React, { useEffect, useState } from 'react'
import Stapper from '../../atoms/Stapper'
import StarRating from '../../atoms/StarRating'
import mobile from '../../../assets/mobile.png'
import Button from '../../atoms/Button'
import InputField from '../../atoms/InputField'
import { useSelector, useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil } from '@fortawesome/free-solid-svg-icons'
import {
  NewWishList,
  addReview,
  addShippingDetails,
  addWishList,
} from '../../../redux/sliceData'
import { useNavigate } from 'react-router-dom'

function OrderPage() {
  const [totalPrice, setTotalPrice] = useState()
  const [ratingDetails, setratingDetails] = useState({
    rating: "",
    name: '',
    title: '',
    email: '',
    comment: '',
  })
  const nav = useNavigate()
  const dispatch = useDispatch()
  const shippingDetails = useSelector((state) => state.data.shippingDetails)
  const review = useSelector((state) => state.data.review)
  console.log(review, "review");
  const handleEdit = () => {
    dispatch(NewWishList(shippingDetails.productDetails))
    nav('/buynow')
  }
  const handleChange = (e) => {
    setratingDetails({ ...ratingDetails, [e.target.name]: e.target.value })


  }
  const handleSubmit = () => {
    dispatch(addReview({ id: 1, review: ratingDetails }))


  }
  useEffect(() => {
    const totalSum = shippingDetails.productDetails.reduce((sum, v) => {
      return sum + Number(v.price)
    }, 0)
    setTotalPrice(totalSum)
  }, [])
  const sendValue = (e) => {
    setratingDetails({ ...ratingDetails, rating: e })

  }
  console.log(shippingDetails.productDetails, "shipping details");
  return (
    <div className="container " style={{ marginTop: '8%' }}>
      <div className="row container mainCard w-100 p-5">
        <div className="col-sm-12">
          <div className="order-tytle fs-4">Tracking Order</div>
          <Stapper />
        </div>
        <div className="col-sm-12">
          <div className="fs-5">
            Want any help?{' '}
            <a href="#" style={{ color: 'blue', textDecoration: 'none' }}>
              Please contact us
            </a>
          </div>
        </div>
      </div>
      <div className="row container mainCard w-100 p-5 mt-5">
        <div className="col-sm-4 just-center">
          <img className="product-img" src={mobile} alt="" />
        </div>

        <div className="col-sm-8">
          <div className="col-sm-12">
            <div className="row">
              {/* div.col-11 */}
            </div>
            <div className="order-tytle fs-4 pb-2">Rating</div>
            <p>Give your Valuable feedback</p>
            <StarRating
              sendValue={sendValue}
              totalStars={5}
              value={1}
              className={'reviewStar py-2'}
            />
            <Button name={'Add photo'} />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6">
            <InputField
              className={'inputfieldstyle'}
              name="name"
              value={ratingDetails.name}
              handleChange={handleChange}
              labelName={'Name'}
            />
          </div>
          <div className="col-sm-6">
            <InputField
              className={'inputfieldstyle'}
              labelName={'Title'}
              name="title"
              value={ratingDetails.title}
              handleChange={handleChange}
            />
          </div>
          <div className="col-sm-12">
            <InputField
              className={'inputfieldstyle'}
              labelName={'Email'}
              name="email"
              value={ratingDetails.email}
              handleChange={handleChange}
            />
          </div>
          <div className="col-sm-12">
            <InputField
              labelName={'Comment '}
              className={'inputfieldstyle'}
              style={{ height: '20vw' }}
              name="comment"
              value={ratingDetails.comment}
              handleChange={handleChange}
            />
          </div>
          <Button name={'Submit'} btnFunction={handleSubmit} />
        </div>
      </div>
    </div>
  )
}

export default OrderPage
