import React from 'react'

function Stapper() {
  return (
    <div className='stepperstayle'>

    <ol>
    <li class='active'>
      <h2>1</h2>
      <p className='c-white'>Ordered</p>
    </li>
    <li class='active'>
      <h2>2</h2>
      <p className='c-white'>Shipped</p>
    </li>
    <li class='active'>
      <h2 >3</h2>
      <p className='c-white'>On the way</p>
    </li>
    <li class=''>
      <h2>3</h2>
      <p className='c-white'>Delivered</p>
    </li>
  </ol>
    </div>
  )
}

export default Stapper
