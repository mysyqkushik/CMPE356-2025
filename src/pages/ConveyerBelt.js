import React from "react";
import "./ConveyerBelt.css";
import { Link } from "react-router-dom";

const books = [
  { id: 1,  image: "/1984.jpg" },
  { id: 2,  image: "/theodyssey.jpg" },
  { id: 3,  image: "/brothers.jpg" },
  { id: 4,  image: "/tomo.jpg" },
  { id: 5,  image: "/fourthwing.jpg" },
  { id: 6,  image: "/got.jpg" },
  { id: 7,  image: "/sarahjmaas.jpg" },
  { id: 8,  image: "/mobydick.jpg" },
  { id: 9,  image: "/p&p.jpg" },
  { id: 10,  image: "/richardosman.jpg" },
  { id: 11,  image: "/richardosman2.jpg" },
  { id: 12,  image: "/sallyrooney.jpg" },
  { id: 13,  image: "/severance.jpg" },
  { id: 14,  image: "/lotr.jpg" },
  { id: 15,  image: "/blissmontage.jpg" },
  { id: 16,  image: "/thegreatgatsby.jpg" },
  { id: 17,  image: "/tokillamockingbird.jpg" },
  { id: 18,  image: "war&peace.jpg" },
  { id: 19,  image: "/crime.jpg" },
  { id: 20,  image: "/wutheringheights.jpg" },
  { id: 21,  image: "/yellowface.jpg" },
  { id: 22,  image: "/animalfarm.jpg" },
];

const NewArrivals = () => {
  return (
    <div className="new-arrivals39">
      <h2><a href="/ViewCatalog">Library</a></h2>
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
