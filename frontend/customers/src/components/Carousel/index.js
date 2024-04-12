import React, { useEffect, useState } from 'react';
import "../Carousel/carousel.css"

function Carousel() {
  const [slideIndex, setSlideIndex] = useState(1);

  const plusSlides = (n) => {
    showSlides(slideIndex + n);
  };

  const currentSlide = (n) => {
    showSlides(n);
  };

  const showSlides = (n) => {
    let i;
    const slides = document.getElementsByClassName('mySlides');
    const dots = document.getElementsByClassName('demo');
    if (n > slides.length) {
      setSlideIndex(1);
    } else if (n < 1) {
      setSlideIndex(slides.length);
    } else {
      setSlideIndex(n);
    }
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = 'none';
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(' active', '');
    }
    slides[slideIndex - 1].style.display = 'block';
    dots[slideIndex - 1].className += ' active';
  };

  useEffect(() => {
    showSlides(slideIndex);
    const interval = setInterval(() => {
      plusSlides(1);
    }, 5000);
    return () => clearInterval(interval);
  }, [slideIndex]);

  return (
    <div>
      <div className="container-carousel">
        <div className="mySlides">
          
          <img src="/assets/carousel/5.jpg" style={{ width: '100%' }} />
        </div>

        <div className="mySlides">
          
          <img src="/assets/carousel/4.jpg" style={{ width: '100%' }} />
        </div>

        <div className="mySlides">
          
          <img src="/assets/carousel/3.jpg" style={{ width: '100%' }} />
        </div>

        <div className="mySlides">
          
          <img src="/assets/carousel/7.jpg" style={{ width: '100%' }} />
        </div>

        <a className="prev" onClick={() => plusSlides(-1)}>
          ❮
        </a>
        <a className="next" onClick={() => plusSlides(1)}>
          ❯
        </a>

        <div className="caption-container">
          <p id="caption"></p>
        </div>

        <div className="row carousel-bottom">
          <div className="column">
            <img
              className="demo cursor"
              src="/assets/carousel/5.jpg"
              style={{ width: '100%' }}
              onClick={() => currentSlide(1)}
              alt=''
            />
          </div>
          <div className="column">
            <img
              className="demo cursor"
              src="/assets/carousel/4.jpg"
              style={{ width: '100%' }}
              onClick={() => currentSlide(2)}
              alt=""
            />
          </div>
          <div className="column">
            <img
              className="demo cursor"
              src="/assets/carousel/3.jpg"
              style={{ width: '100%' }}
              onClick={() => currentSlide(3)}
              alt=""
            />
          </div>
          <div className="column">
            <img
              className="demo cursor"
              src="/assets/carousel/7.jpg"
              style={{ width: '100%' }}
              onClick={() => currentSlide(4)}
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Carousel;