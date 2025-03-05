import React, { useReducer } from "react";
import { Link } from 'react-router-dom';
import "./BookCarousel.css";

const slides = [
  {
    content: (
      <Link to="/NewArrivals">
        <img src="/BookCarousel1.png" alt="New Arrivals" className="book-image7" />
      </Link>
    )
  },
  {
    content: (
        <img src="/BookCarouselother.png" alt="New Arrivals" className="book-image7" />
    )
  },
  {
    content: (
      <img src="/BookCarouselother.png" alt="New Arrivals" className="book-image7" />
  )
  },
  {
    content: (
      <img src="/BookCarouselother.png" alt="New Arrivals" className="book-image7" />
  )
  },
  {
    content: (
      <img src="/BookCarouselother.png" alt="New Arrivals" className="book-image7" />
  )
  }
];

const initialState = {
  slideIndex: 0
};

const slidesReducer = (state, event) => {
  if (event.type === "NEXT") {
    return {
      ...state,
      slideIndex: (state.slideIndex + 1) % slides.length
    };
  }
  if (event.type === "PREV") {
    return {
      ...state,
      slideIndex:
        state.slideIndex === 0 ? slides.length - 1 : state.slideIndex - 1
    };
  }
};

const useTilt = (active) => {
    const ref = React.useRef(null);
  
    React.useEffect(() => {
      if (!ref.current || !active) return;
  
      const state = {
        rect: undefined,
        mouseX: undefined,
        mouseY: undefined
      };
  
      let el = ref.current;
  
      const handleMouseMove = (e) => {
        if (!el) return;
        if (!state.rect) {
          state.rect = el.getBoundingClientRect();
        }
        state.mouseX = e.clientX;
        state.mouseY = e.clientY;
        const px = (state.mouseX - state.rect.left) / state.rect.width;
        const py = (state.mouseY - state.rect.top) / state.rect.height;
  
        el.style.setProperty("--px", px);
        el.style.setProperty("--py", py);
      };
  
      // Add event listener for mouse move
      el.addEventListener("mousemove", handleMouseMove);
  
      // Cleanup: remove event listener if component unmounts
      return () => {
        if (el) {
          el.removeEventListener("mousemove", handleMouseMove);
        }
      };
    }, [active]);
  
    return ref;
  };
    

  const Slide = ({ slide, offset }) => {
    const active = offset === 0 ? true : null;
    const ref = useTilt(active);
  
    return (
      <div
        ref={ref}
        className="slide"
        data-active={active}
        style={{
          "--offset": offset,
          "--dir": offset === 0 ? 0 : offset > 0 ? 1 : -1
        }}
      >
        <div className="slideContent">
          {slide.content}  {/* Directly render the image content */}
        </div>
      </div>
    );
};


const BookCarousel = () => {
  const [state, dispatch] = useReducer(slidesReducer, initialState);

  return (
    <div className="slides">
      <button className="prevButton" onClick={() => dispatch({ type: "PREV" })}>
        ‹
      </button>

      {[...slides, ...slides, ...slides].map((slide, i) => {
        let offset = slides.length + (state.slideIndex - i);
        return <Slide slide={slide} offset={offset} key={i} />;
      })}
      <button className="nextButton" onClick={() => dispatch({ type: "NEXT" })}>
        ›
      </button>
    </div>
  );
};

export default BookCarousel;
