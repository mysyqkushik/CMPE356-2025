import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "./BookNews.css";

const slides = [
  {
    img: "booknews1.png", // Replace with actual image paths
    category: "In the world of Books...",
    title: "New & Upcoming Cozy Mystery Reads",
    description: "One of the more intriguing book-world trends in recent years is the expanding popularity of the cozy mystery!",
    link: "https://www.goodreads.com/blog/show/2877-45-new-upcoming-cozy-mysteries-for-your-next-caper?content_type=all",
    date: "Mar 01",
  },
  {
    img: "booknews2.png",
    category: "In the world of Books...",
    title: "Book-to-Screen Adaptations",
    description: " They say that the movie is never as good as the book, let's find out!",
    link: "https://www.goodreads.com/blog/show/2913-get-ready-for-the-year-s-biggest-book-to-screen-adaptations?content_type=all",
    date: "Mar 02",
  },
  {
    img: "booknews3.png", // Replace with actual image paths
    category: "In the world of Books...",
    title: "Nonfiction Books to Read This Women's History Month",
    description: "Here's some trivia for your next book club gathering: Women's History Month, celebrated in March was created in 1978.",
    link: "https://www.goodreads.com/blog/show/2904-192-nonfiction-books-to-read-this-women-s-history-month?content_type=all",
    date: "Mar 03",
  },
  {
    img: "booknews4.png", // Replace with actual image paths
    category: "In the world of Books...",
    title: "Readers' Most Anticipated Books for March",
    description: "Features new books from across the genre spectrum: contemporary fiction, historical fiction, mysteries and thrillers, sci-fi and fantasy, romance, horror, young adult, nonfiction, and more",
    link: "https://www.goodreads.com/blog/show/2890-readers-most-anticipated-books-for-march?content_type=all",
    date: "Mar 04",
  }
];

const BookNews = () => {
  return (
    <div className="booknews-container">
      <Swiper
        navigation={true}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 1300, // Automatically change slides every 300ms (0.3 seconds)
          disableOnInteraction: false, // Continue autoplay even after interacting with the swiper
        }}
        modules={[Navigation, Pagination, Autoplay]} // Import the Autoplay module
        className="booknews-swiper"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className="booknews-slide">
            <div className="booknews-content">
              <img src={slide.img} alt="Book Cover" className="booknews-image" />
              <div className="booknews-text">
                <span className="news-category">{slide.category}</span>
                <a href={slide.link} className="news-title">
                  {slide.title}
                </a>
                <p className="news-description">{slide.description}</p>
                <div className="news-meta">
                  <span>{slide.likes}</span>
                  {slide.comments && <span>• {slide.comments}</span>}
                </div>
                <span className="news-date">{slide.date}</span>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BookNews;
