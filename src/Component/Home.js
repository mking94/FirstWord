import React from "react";
import "./Home.css";
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/swiper-bundle.css";
import { Autoplay, Navigation } from "swiper";
import "./styles.css"

function Home() {
  return (
      <div className="App-home">
		 <Swiper navigation = {true} modules = {[Autoplay, Navigation]} autoplay={{delay: 2500, disableOnInteraction: false,}} className = "mySwiper">
			<SwiperSlide><img src="https://upload.wikimedia.org/wikipedia/commons/3/38/Detected-with-YOLO--Schreibtisch-mit-Objekten.jpg" alt="img1"/></SwiperSlide>
			<SwiperSlide><img src="https://learn.alwaysai.co/hs-fs/hubfs/object-dectection-4-2.jpg?width=900&height=569&name=object-dectection-4-2.jpg" alt="img2"/></SwiperSlide>
			<SwiperSlide><img src="https://learn.g2.com/hubfs/G2CM_FI264_Learn_Article_Images_%5BObject_detection%5D_V1a.png" alt="img3"/></SwiperSlide>
		</Swiper>
      </div>
    );
}

export default Home;