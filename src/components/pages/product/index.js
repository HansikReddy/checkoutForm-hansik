import React, { useState } from 'react'
import mobile from '../../../assets/mobile.png'
import ipad from '../../../assets/ipad.png'
import headphone from '../../../assets/headphone.png'
import { useSelector } from 'react-redux'

import { useDispatch } from 'react-redux'
import ProductCard from './../../atoms/ProductCard';
import { addWishList } from '../../../redux/sliceData'

function ProductPage({icon,name,price}) {
    const productList=useSelector((state)=>state.data.productList)
    const dispatch=useDispatch()
    console.log("kkgjfkjgkjfgkj",productList);
    const addTocartFun=(v)=>{
     dispatch(addWishList(v))


    }

  return (
    <div className="container">

    <div className=' row productlistbox'>
    {productList.map((v,i)=>{
        return (<div className='col-sm-12'>
    <ProductCard data={v} addTocartFun={()=>{addTocartFun(v)}}/>

        </div>)
    })}
      
    </div>
    </div>
  )
}

export default ProductPage
