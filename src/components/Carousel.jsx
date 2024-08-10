// Carousel.jsx
// index.js o App.js
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import Slider from 'react-slick';

const carouselImages = [
  { src: './public/logo-doflamingo.png', alt: 'Promoción 1' },
  { src: './public/bannerCuatro.jpg', alt: 'Promoción 2' },
  { src: './public/bannerTres.jpg', alt: 'Promoción 3' },
];

const settings = {
  dots: false,
  infinite: true,
  speed: 3500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 100,
};

export function Carousel() {
  return (
    <div className="carousel-container">
      <Slider {...settings}>
        {carouselImages.map((image, index) => (
          <div key={index} className="carousel-slide">
            <img src={image.src} alt={image.alt} className="w-full h-80 object-fixed " />
          </div>
        ))}
      </Slider>
    </div>
  );
}
