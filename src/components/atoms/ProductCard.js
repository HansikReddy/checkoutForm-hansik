import React from 'react'
import Button from './Button'
import StarRating from './StarRating'

function ProductCard({ data, addTocartFun }) {
  return (
    <div className='mb-0 '>
      <div className="row mainCard  just-center mb-0" >
        <div className="col-sm-8">
          <div className="row">
            <div className="col-sm-4 just-center">
              <img className="product-img" src={data.img} alt="" />
            </div>
            <div className="col-sm-8">
              <div className="product-tytle fs-2">{data.name}</div>
              <div className=" fs-5 text-justify">
                {data.details.title}
                {/* 10.9-inch iPad- Silver (10th Generation) */}
              </div>
              <div>
                <p>
                  {data.details.des}
                </p>
              </div>
              <div className='col-sm-12'>
                <StarRating totalStars={5} value={data.review.rating} disable={true} />
              </div>

              <div className="fs-1 fw-bold">
                {' '}
                <span className="fs-1 fw-light" style={{ color: 'red' }}>
                  -{data.discount}%
                </span>{' '}
                {data.price} &#36;{' '}
                <span className="fs-4" style={{ color: 'gray' }}>
                  {' '}
                  <s>{data.baseprice}</s>
                </span>
                <div className='fs-6 fw-light'><span style={{ color: "red" }}>EMI </span>starts at {data.emi}. No Cost EMI available</div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-3 ">
          <Button btnFunction={addTocartFun} name="Add to cart" className={'w-60'} />
        </div>
      </div>
    </div>
  )
}

export default ProductCard
