import React from 'react'
import Navbar from '../components/Home/Hero/Navbar'
import Testimonials from '../components/Home/Testimonials'
import Footer from '../components/Home/Footer'
import Carosel from '../components/Home/Hero/Carosel'
import CartIcon from '../components/Home/CartIcon'
import HomeProducts from '../components/Home/HomeProducts'
import HomeCategory from '../components/Home/HomeCategory'

const Home = () => {
  return (
    <>
    <Navbar />
    <Carosel />
    <CartIcon />
    <p className='container mx-auto font-bold text-2xl my-4 p-4'>Flash Sale</p>
    <HomeProducts />
    <p className='container mx-auto font-bold text-2xl my-4 p-4'>Categories</p>
    <HomeCategory />
    <p className='container mx-auto font-bold text-2xl my-4 p-4'>Just For You</p>
    <HomeProducts />
    <Testimonials />
    <Footer />
    </>
  )
}

export default Home
