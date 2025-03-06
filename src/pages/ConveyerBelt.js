import React from "react";
import "./ConveyerBelt.css";

const books = [
  { id: 1, title: "Book 1", image: "/BookCarousel1.png" },
  { id: 2, title: "Book 2", image: "/BookCarousel2.jpg" },
  { id: 3, title: "Book 3", image: "/BookCarousel3.jpg" },
  { id: 4, title: "Book 4", image: "/BookCarousel4.jpg" },
  { id: 5, title: "Book 5", image: "/BookCarousel1.png" },
  { id: 6, title: "Book 6", image: "/BookCarouselother.png" },
  { id: 7, title: "Book 7", image: "/BookCarousel2.jpg" },
  { id: 8, title: "Book 8", image: "/BookCarousel3.jpg" },
  { id: 9, title: "Book 9", image: "/BookCarousel4.jpg" },
];

const NewArrivals = () => {
  return (
    <div className="new-arrivals">
      <h2>New Arrivals</h2>
      <div className="conveyor-belt">
        <div className="book-track">
          {books.concat(books).map((book) => (
            <div className="book" key={book.id}>
              <img src={book.image} alt={book.title} />
              <p>{book.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewArrivals;
