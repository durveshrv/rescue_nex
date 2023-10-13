import React, { useEffect, useRef, useState } from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Import Bootstrap JavaScript
import '../App.css'; // Import a custom CSS file for smooth transitions

export default function Carou(props) {
  const carouselId = `carousel-${props.id}`;
  const carouselStyle = {
    float: props.floatDirection,
    width: '50%', // Set a fixed width for the carousel container
    display: 'inline-block', // Ensure the carousels appear inline
  };

  const [activeIndex, setActiveIndex] = useState(0);

  // Ref to store the interval ID
  const intervalRef = useRef(null);

  useEffect(() => {
    // Function to go to the next slide
    const nextSlide = () => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % 3); // Assuming you have 3 slides
    };

    // Start the automatic sliding after an interval (e.g., every 3 seconds)
    intervalRef.current = setInterval(nextSlide, 3000); // Slide every 3 seconds

    // Clear the interval when the component unmounts
    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div style={carouselStyle}>
      <div>
        <div
          id={carouselId}
          className="carousel slide shadow-lg w-75 p-3 mx-auto my-5" style={{ borderRadius: "20px", backgroundColor: 'white' }}
          data-bs-ride="carousel"
        >
          <h4>{props.title}</h4>
          <div className="carousel-inner">
            <div className={`carousel-item ${activeIndex === 0 ? 'active' : ''}`}>
              <img
                className="d-block w-100"
                src={`https://source.unsplash.com/random/900x700/?${props.first}`}
                alt="First slide"
              />
            </div>
            <div className={`carousel-item ${activeIndex === 1 ? 'active' : ''}`}>
              <img
                className="d-block w-100"
                src={`https://source.unsplash.com/random/900x700/?${props.second}`}
                alt="Second slide"
              />
            </div>
            <div className={`carousel-item ${activeIndex === 2 ? 'active' : ''}`}>
              <img
                className="d-block w-100"
                src={`https://source.unsplash.com/random/900x700/?${props.third}`}
                alt="Third slide"
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            data-bs-target={`#${carouselId}`}
            type="button"
            data-bs-slide="prev"
            onClick={() => setActiveIndex((prevIndex) => (prevIndex - 1 + 3) % 3)}
          >
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          </button>
          <button
            className="carousel-control-next"
            data-bs-target={`#${carouselId}`}
            type="button"
            data-bs-slide="next"
            onClick={() => setActiveIndex((prevIndex) => (prevIndex + 1) % 3)}
          >
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
          </button>
        </div>
      </div>
    </div>
  );
}
