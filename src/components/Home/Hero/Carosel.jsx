import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css"; 

const Carosel = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,       
    autoplaySpeed: 3000, 
  };

  return (
    <div className="max-w-screen-2xl mx-auto mt-4">
      <Slider {...settings}>
      <div className="flex justify-center">
        <div className="relative w-full">
          <img className="rounded-lg w-full object-cover h-[600px]" src="../../../assets/images/1726941063358.jpg" alt="Slide 1" />
          
          {/* Black overlay with opacity */}
          <div className="absolute inset-0 bg-black opacity-75 rounded-lg"></div>

          {/* Text content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-red-950">
            <h1 className="text-5xl my-4 text-white font-bold">Hi I am Danial!</h1>
            <p className="text-white text-lg font-bold">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, non?</p>
            <button className="rounded h-12 bg-gradient-to-r from-purple-500 to-pink-500 p-2 my-3 text-white font-extrabold hover:scale-110">Shop Now</button>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="relative w-full">
          <img className="rounded-lg w-full object-cover h-[600px]" src="../../../assets/images/1726941063358.jpg" alt="Slide 1" />
          
          {/* Black overlay with opacity */}
          <div className="absolute inset-0 bg-black opacity-75 rounded-lg"></div>

          {/* Text content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-red-950">
            <h1 className="text-5xl my-4 text-white font-bold">Hi I am Danial!</h1>
            <p className="text-white text-lg font-bold">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, non?</p>
            <button className="rounded h-12 bg-gradient-to-r from-purple-500 to-pink-500 p-2 my-3 text-white font-extrabold hover:scale-110">Shop Now</button>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative w-full">
          <img className="rounded-lg w-full object-cover h-[600px]" src="../../../assets/images/1726941063358.jpg" alt="Slide 1" />
          
          {/* Black overlay with opacity */}
          <div className="absolute inset-0 bg-black opacity-75 rounded-lg"></div>

          {/* Text content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-red-950">
            <h1 className="text-5xl my-4 text-white font-bold">Hi I am Danial!</h1>
            <p className="text-white text-lg font-bold">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, non?</p>
            <button className="rounded h-12 bg-gradient-to-r from-purple-500 to-pink-500 p-2 my-3 text-white font-extrabold hover:scale-110">Shop Now</button>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative w-full">
          <img className="rounded-lg w-full object-cover h-[600px]" src="../../../assets/images/1726941063358.jpg" alt="Slide 1" />
          
          {/* Black overlay with opacity */}
          <div className="absolute inset-0 bg-black opacity-75 rounded-lg"></div>

          {/* Text content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-red-950">
            <h1 className="text-5xl my-4 text-white font-bold">Hi I am Danial!</h1>
            <p className="text-white text-lg font-bold">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, non?</p>
            <button className="rounded h-12 bg-gradient-to-r from-purple-500 to-pink-500 p-2 my-3 text-white font-extrabold hover:scale-110">Shop Now</button>
          </div>
        </div>
      </div>
      </Slider>
    </div>
  );
}

export default Carosel;
