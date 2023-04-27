import { faCartArrowDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';

function NavBar() {
    const nav=useNavigate()
    const wishList=useSelector((state)=>state.data.wishList)
  return (
    <nav className="navbar navbar-light position-fixed w-100 top-0 navstyle " style={{borderRadius:"0px"}}>
    <div className='row '>
    <div className="col-sm-2 mx-2">
  
  <p className='fs-3 fw-bold ' style={{color:"#fe6600", cursor:"pointer"}} onClick={()=>nav("/")}>CheckoutApp</p>

    </div>

    </div>
    <div className='px-4'>
    <span className='notefi'>{wishList.length}</span>
 <FontAwesomeIcon className='fs-3' icon={faCartArrowDown}/>
 <span className='p-2 fs-5 fw-bold' style={{cursor:"pointer"}} onClick={()=>nav("buynow")}>Go To Cart</span>

    </div>
</nav>
  )
}

export default NavBar
