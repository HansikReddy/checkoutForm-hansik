import { faMinus, faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import InputField from '../../../atoms/InputField'
import { useDispatch, useSelector } from 'react-redux'
import { removeWishListById } from '../../../../redux/sliceData'

function YourProduct() {
  const wishList = useSelector((state) => state.data.wishList)
  const [wishlistrender, setWishlistrender] = useState([])
  const [totalDiscount, setTotalDiscount] = useState('')
  const [totalPrice, setTotalPrice] = useState('')
  const shippingDetails = useSelector((state) => state.data.shippingDetails)
  const dispatch = useDispatch()
  const [disabled, setDisabled] = useState(false)

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
      //   setOrderDetails(shippingDetails.paymentDetails)

      wishList.length >= 1
      ? setWishlistrender(wishList)
      : setWishlistrender(shippingDetails.productDetails)
  }, [])

  return (
    <div class="card h-100">
      <div className="row m-4 just-center">
        <div className="row hrstyle mb-2  mx-0">
          <div className="col-sm-10 mx-0 ">
            <h1 className="fs-3 mb fw-bold ">YOUR PRODUCTS</h1>
          </div>
          <div className="col-sm-2 fs-6 fw-bold">
            <p>{wishList.length} items</p>
          </div>
        </div>
        {wishList.length == 0
          ? <div className='just-center ' style={{ height: "25vw", color: "#fff" }}>
            <h2 >No product Selected</h2>
          </div>
          : wishList.map((v, i) => {
            console.log(v.count)
            return (
              <>
                <div className="row paper ">
                  <div className="col-sm-3">
                    <img className="product-img" src={v.img} alt="" />
                  </div>
                  <div className="col-sm-5 align-items-center ">
                    <div className="product-tytle">{v.name}</div>
                    <div className="proColor">color:{v.details.color}</div>
                    <div>{v.price} &#36;</div>
                  </div>
                  <div className="col-sm-2 just-center">
                    <FontAwesomeIcon
                      className="fas"
                      icon={faMinus}
                    // onClick={() => {
                    //   dispatch(removeCount(v.id))
                    // }}
                    />
                    <InputField className={'countInput'} value={v.count} />
                    <FontAwesomeIcon
                      className="fas"
                      color="blue"
                      icon={faPlus}
                    // onClick={() => {
                    //   dispatch(addCount(v.id))
                    // }}
                    />
                  </div>
                  <div className="col-sm-1 just-center">
                    <FontAwesomeIcon
                      style={{ color: 'brown' }}
                      onClick={() => deleatProduct(i)}
                      icon={faTrashCan}
                    />
                  </div>
                </div>
              </>
            )
          })}

        <div className="row ">
          <div className='hrstyle'></div>
          <div className="col-sm-24 mb-4">
            <div className="row p-2">
              <div className="col-sm-8">
                <p className="fw-bold">Discount</p>
              </div>
              <div className="col-sm-4 fw-bold text-end">
                {typeof totalDiscount === 'number'
                  ? totalDiscount.toFixed(2)
                  : totalDiscount}
                $
              </div>
            </div>
            <div className="row p-2 totalbox">
              <div className="col-sm-8">
                <p className="fw-bold mb-2 mt-2 ">Total</p>
              </div>
              <div className="col-sm-4  fw-bold text-end">
                {totalPrice}$
              </div>
            </div>


          </div>

        </div>
        {/* <hr className='hrstyle' /> */}
      </div>
    </div>
  )
}

export default YourProduct
