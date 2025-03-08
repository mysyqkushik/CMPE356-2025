import React, { useState } from "react";
import "./WriteAReview.css"; // Import CSS

// Sample book data
const libraryData = {
    books: [
        { 
          id: 1, 
          title: "The Great Gatsby", 
          author: "F. Scott Fitzgerald", 
          image: "/thegreatgatsby.jpg" 
        },
        { 
          id: 2, 
          title: "To Kill a Mockingbird", 
          author: "Harper Lee", 
          image: "/tokillamockingbird.jpg" 
        },
        { 
          id: 3, 
          title: "1984", 
          author: "George Orwell", 
          image: "/1984.jpg" 
        },
        { 
          id: 4, 
          title: "Moby-Dick", 
          author: "Herman Melville", 
          image: "/mobydick.jpg" 
        },
        { 
          id: 5, 
          title: "Pride and Prejudice", 
          author: "Jane Austen", 
          image: "/p&p.jpg" 
        },
        { 
          id: 6, 
          title: "Animal Farm", 
          author: "George Orwell", 
          image: "/animalfarm.jpg" 
        },
        { 
          id: 7, 
          title: "Game of Thrones", 
          author: "George R. R. Martin", 
          image: "/got.jpg" 
        },
        { 
          id: 8, 
          title: "War and Peace", 
          author: "Leo Tolstoy",
          image: "/war&peace.jpg" 
        },
        { 
          id: 9, 
          title: "Crime and Punishment", 
          author: "Fyodor Dostoevsky", 
          image: "/crime.jpg" 
        },
        { 
          id: 10, 
          title: "The Lord of the Rings", 
          author: "J.R.R. Tolkien", 
          image: "/lotr.jpg" 
        },
        { 
          id: 11, 
          title: "Yellowface", 
          author: "R.F. Kuang", 
          image: "/yellowface.jpg" 
        },
        { 
          id: 12, 
          title: "Fourth Wing", 
          author: "Rebecca Yarros", 
          image: "/fourthwing.jpg" 
        },
        { 
          id: 13, 
          title: "Wuthering Heights", 
          author: "Emily Brontë", 
          image: "/wutheringheights.jpg" 
        },
        { 
          id: 14, 
          title: "The Odyssey", 
          author: "Homer", 
          image: "/theodyssey.jpg" 
        },
        { 
          id: 15, 
          title: "The Brothers Karamazov", 
          author: "Fyodor Dostoevsky", 
          image: "/brothers.jpg" 
        },
        { 
          id: 16, 
          title: "Beautiful World, Where Are You", 
          author: "Sally Rooney", 
          image: "/sallyrooney.jpg" 
        },
        { 
          id: 17, 
          title: "The Man Who Died Twice", 
          author: "Richard Osman", 
          image: "/richardosman.jpg" 
        },
        { 
          id: 18, 
          title: "Severance", 
          author: "Ling Ma", 
          image: "/severance.jpg" 
        },
        { 
          id: 19, 
          title: "House of Sky and Breath", 
          author: "Sarah J. Maas", 
          image: "/sarahjmaas.jpg" 
        },
        { 
          id: 20, 
          title: "Tomorrow, and Tomorrow, and Tomorrow", 
          author: "Gabrielle Zevin", 
          image: "/tomo.jpg" 
        },
        { 
          id: 21, 
          title: "The Bullet That Missed", 
          author: "Richard Osman", 
          image: "/richardosman2.jpg" 
        },
        { 
          id: 22, 
          title: "Bliss Montage", 
          author: "Ling Ma", 
          image: "/blissmontage.jpg" 
        }
      ]
};

const WriteAReview = () => {
  const [selectedBook, setSelectedBook] = useState(null);
  const [review, setReview] = useState("");
  const [isReviewSubmitted, setIsReviewSubmitted] = useState(false);

  const handleBookSelect = (id) => {
    const book = libraryData.books.find((book) => book.id === id);
    setSelectedBook(book);
    setIsReviewSubmitted(false); // Reset submission state when new book is selected
  };

  const handleReviewChange = (e) => {
    const { value } = e.target;
    if (value.length <= 100) {
      setReview(value);
    }
  };

  const handleSubmitReview = () => {
    setIsReviewSubmitted(true);
  };

  return (
    <div className="write-review767">
      <h1 className="title767">Write a Review</h1>
      
      <div className="book-select767">
        <h2>Select a Book to Review</h2>
        <select onChange={(e) => handleBookSelect(Number(e.target.value))}>
          <option value="">--Select a Book--</option>
          {libraryData.books.map((book) => (
            <option key={book.id} value={book.id}>
              {book.title}
            </option>
          ))}
        </select>
      </div>

      {selectedBook && (
        <div className="selected-book-info767">
          <img src={selectedBook.image} alt={selectedBook.title} className="book-image767" />
          <h3>{selectedBook.title}</h3>
          <p>{selectedBook.author}</p>
        </div>
      )}

      {selectedBook && !isReviewSubmitted && (
        <div className="review-section767">
          <textarea
            placeholder="Max 100 words"
            value={review}
            onChange={handleReviewChange}
            className="review-textarea767"
            maxLength="100"
          />
          <div className="word-count767">{review.length} / 100</div>
          <button onClick={handleSubmitReview} className="submit-review-button767">
            Submit Your Review
          </button>
        </div>
      )}

      {isReviewSubmitted && (
        <div className="review-submitted-message767">
          <p>Review submitted, thanks!</p>
        </div>
      )}

      <div className="return-home-button767">
        <button onClick={() => window.location.href = "/"}>Return to Home Page</button>
      </div>
    </div>
  );
};

export default WriteAReview;
