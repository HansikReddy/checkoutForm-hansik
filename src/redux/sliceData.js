import { createSlice } from '@reduxjs/toolkit'
import mobile from '../assets/mobile.png'
import ipad from '../assets/ipad.png'
import headphone from '../assets/headphone.png'
const productData = [
  {
    id: '1',
    name: 'Samsung Galaxy M11 64GB',
    price: 25,
    img: mobile,
    count: 1,
    color: 'Dark Blue',
    emi: '1250',
    discount: 4,
    baseprice: 29,
    details: {
      title:
        'Midnight Blue, 4GB, 64GB Storage | 6000mAh Battery | Upto 8GB RAM with RAM Plus',
      des: `Upto 12GB RAM with RAM Plus | 64GB internal memory expandable up to 1TB| Dual Sim (Nano)
      50MP+5MP+2MP Triple camera setup- True 50MP (F1.8) main camera +5MP(F2.2)+ 2MP (F2.4) | 8MP (F2.2) front cam
      Android 12,One UI Core 4 with a powerful Octa Core Processor
      16.72 centimeters (6.6-inch) FHD+ LCD - infinity O Display, FHD+ resolution with 1080 x 2408 pixels resolution, 401 PPI with 16M`,
    },
    review: {
      rating: '',
      name: '',
      title: '',
      email: '',
      comment: '',
    },
  },
  {
    id: '2',
    name: 'Headphones Bose 35 II',
    price: '9',
    img: headphone,
    count: 1,
    emi: '1250',
    discount: 4,
    baseprice: '2',

    color: 'Red',
    review: {
      rating: '',
      name: '',
      title: '',
      email: '',
      comment: '',
    },
    details: {
      title: ` Personalize your environment with 11 levels of noise cancelling - control distractions or let ambient sound in`,
      des: `Keep your phone in your pocket and your head up to the world with easy access to voice assistants for music, navigation, weather and more Listen comfortably for hours - a streamlined, lightweight stainless-steel headband and angled ear cups make for a perfect fit`,
    },
  },
  {
    id: '3',
    name: 'iPad 9.7 6-gen WiFi 32GB',
    price: 5,
    baseprice: '5',
    img: ipad,
    count: 1,
    color: 'Silver',
    emi: '2',
    discount: 4,
    review: {
      rating: '',
      name: '',
      title: '',
      email: '',
      comment: '',
    },

    details: {
      title: '10.9-inch iPad- Silver (10th Generation) ',
      des: `Striking 10.9-inch Liquid Retina display with True Tone A14
      Bionic chip with 6-core CPU and 4-core GPU 12MP Wide back
      camera Landscape 12MP Ultra Wide front camera with Center
      Stage Touch ID for secure authentication and Apple Pay`,
    },
  },
]

export const mainSlice = createSlice({
  name: 'main',
  initialState: {

    // _______________________________________
    billingInfo: {
      fname: '',
      lname: '',
      mobile: '',
      email: '',
      address: '',
    },
    shippingInfo: {
      fname: '',
      lname: '',
      mobile: '',
      address: '',
    },
    paymentInfo: {
      cardNO: '',
      cardName: '',
      expiration: '',
      cvv: '',
    },
    custemerDetails: {},
    // ____________________________________________________
    productList: productData,
    wishList: [],
    review: {},
    shippingDetails: { productDetails: [], paymentDetails: {} },

  },

  reducers: {

    saveBillingState: (state, action) => {
      state.billingInfo = action.payload
    },
    saveShippingState: (state, action) => {
      state.shippingInfo = action.payload
    },
    savePaymentState: (state, action) => {
      state.paymentInfo = action.payload
    },
    saveCustomerDetails: (state, action) => {
      if (action.payload === "save") {
        const { billingInfo, shippingInfo, paymentInfo } = state
        state.custemerDetails = { billingInfo, shippingInfo, paymentInfo }
        state.billingInfo = { fname: '', lname: '', mobile: '', email: '', address: '', }
        state.shippingInfo = { fname: '', lname: '', mobile: '', address: '', }
        state.paymentInfo = { cardNO: '', cardName: '', expiration: '', cvv: '', }
      }
    },




    NewProductList: (state, action) => {
      state.productList = action.payload
    },
    NewWishList: (state, action) => {
      state.wishList = action.payload
    },

    getProduct: (state) => {
      return state.payload
    },
    getWishList: (state) => {
      return state.wishList
    },
    getShippingDetails: (state) => {
      return state.shippingDetails
    },
    getReview: (state) => {
      return state.review
    },
    getAvrageRating: (state) => {
      const avRating = state.productList.map((v) => {
        const sumValue = v.review.reduce((sum, v) => {
          return sum + v.rating
        }, 0)
        return sumValue / v.review.length
      })
      return avRating
    },
    addProductList: (state, action) => {
      state.productList = [...state.productList, action.payload]
    },
    addWishList: (state, action) => {
      state.wishList = [...state.wishList, action.payload]
    },
    addShippingDetails: (state, action) => {
      state.shippingDetails = action.payload
    },
    addReview: (state, action) => {
      console.log(action.payload.review)
      state.review = action.payload.review
    },
    addCount: (state, action) => {
      console.log(action)
      let countlist = JSON.parse(JSON.stringify(state.productList))
      countlist.forEach((v, i) => {
        if (v.id === action.id) {
          countlist = v.count + 1
        }
      })
      state.productList = countlist
    },
    removeCount: (state, action) => {
      let countlist = JSON.parse(JSON.stringify(state.productList))
      countlist.forEach((v, i) => {
        if (v.count !== 1) {
          if (v.id === action.id) {
            countlist = v.count - 1
          }
        }
      })
      state.productList = countlist
    },
    removeWishListById: (state, action) => {
      let val = [...state.wishList]
      val.splice(action.id, 1)
      state.wishList = val
    },
  },
})

export const {
  NewProductList,
  NewWishList,
  getProduct,
  getWishList,
  getShippingDetails,
  getReviewDetails,
  getAvrageRating,
  addProductList,
  addWishList,
  addShippingDetails,
  addReview,
  addCount,
  removeCount,
  removeWishListById,

  saveBillingState,
  saveShippingState,
  savePaymentState,
  saveCustomerDetails

} = mainSlice.actions

export const billingInfoData = (state) => state.billingInfo

export default mainSlice.reducer
