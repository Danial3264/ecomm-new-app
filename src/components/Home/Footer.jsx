import React from 'react'

const Footer = () => {
  return (
    <>
      <div className='grid grid-cols-1 text-center md:grid-cols-3 md:text-start lg:text-start lg:grid-cols-5  bg-gray-200 p-20 mt-6 space-x-3 space-y-3'>
        <div>Logo</div>
        <div className='flex flex-col space-y-3'>
          <p className='font-bold text-lg'>Products</p>
          <a href="">Bag</a>
          <a href="">Tees</a>
          <a href="">Object</a>
          <a href="">Home Goods</a>
          <a href="">Accessories</a>
        </div>
        <div className='flex flex-col space-y-3'>
          <p className='font-bold'>Company</p>
          <a href="">Terms of Service</a>
          <a href="">Privacy Policy</a>
          <a href="">Who we are</a>
          <a href="">Careers</a>
          <a href="">Press</a>



        </div>
        <div className='flex flex-col space-y-3'>
          <p className='font-bold'>Customer Service</p>
          <a href="">Contact</a>
          <a href="">Shipping</a>
          <a href="">Returns</a>
          <a href="">Warranty</a>
          <a href="">FAQ</a>
        </div>
        <div className='w-full colspan-2 space-y-3'>
          <p className='font-bold'>Sign up for our newsletter</p>
          <input className='p-3 w-full rounded' type="text" name="" id="" />
          <button className='bg-red-700 hover:bg-red-500 p-3 rounded-lg text-white font-bold'>Sign Up for Better Deals</button>

        </div>
      </div>
    </>
  )
}

export default Footer
