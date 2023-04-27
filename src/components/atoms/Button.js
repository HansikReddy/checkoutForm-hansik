import React from 'react'

function Button({name,className,btnFunction}) {
  return (
    <div>
      <button className={`paymentBtn ${className}`} onClick={btnFunction}>{name}</button>
      
    </div>
  )
}

export default Button
