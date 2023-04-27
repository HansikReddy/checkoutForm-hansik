import logo from './logo.svg'
import './App.css'
import BuyNow from './components/pages/buyNow'
import './styles/globle.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ProductPage from './components/pages/product'
import OrderPage from './components/pages/orderpage'
import NavBar from './components/atoms/NavBar'


function App() {
  return (
    <>
      <div className="App">
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path="/" element={<ProductPage />}>
              <Route path="/*" />
            </Route>
            <Route element={<BuyNow />}>
              <Route path="/buynow" />
            </Route>
            <Route element={<OrderPage />}>
              <Route path="/orderdetails" />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
