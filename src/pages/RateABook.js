import React, { useState } from "react";
import "./RateABook.css"; // Import CSS

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

function RateABook() {
    const [selectedBook, setSelectedBook] = useState(null);
    const [rating, setRating] = useState(0);
    const [isSubmitted, setIsSubmitted] = useState(false);
  
    const handleSelectBook = (book) => {
      setSelectedBook(book);
      setIsSubmitted(false);
    };
  
    const handleMouseOver = (value) => {
      setRating(value);
    };
  
    const handleSubmitRating = () => {
      setIsSubmitted(true);
    };
  
    const handleReturnHome = () => {
      window.location.href = '/HomePage'; // Redirect to home page
    };
  
    return (
      <div className="rate-book-container767">
        <h1 className="rate-book-title767">Rate a Book</h1>
  
        {!isSubmitted ? (
          <div className="book-selection767">
            <h2 className="select-book-title767">Select a Book to Rate:</h2>
            <select onChange={(e) => handleSelectBook(libraryData.books.find(book => book.id === parseInt(e.target.value)))} className="book-dropdown767">
              <option value="">--Choose a book--</option>
              {libraryData.books.map(book => (
                <option key={book.id} value={book.id}>{book.title}</option>
              ))}
            </select>
            
            {selectedBook && (
              <div className="book-details767">
                <img src={selectedBook.image} alt={selectedBook.title} className="book-image767" />
                <h3>{selectedBook.title}</h3>
                <p>{selectedBook.author}</p>
  
                <div className="stars-container767">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={`star767 ${rating >= star ? 'star-filled767' : ''}`}
                      onMouseEnter={() => handleMouseOver(star)}
                      onClick={() => setRating(star)}
                    >
                      ★
                    </span>
                  ))}
                </div>
  
                <button onClick={handleSubmitRating} className="submit-rating-btn767">Submit Your Rating</button>
              </div>
            )}
          </div>
        ) : (
          <div className="rating-submitted767">
            <h2 className="rating-message767">Rating Submitted, Thanks!</h2>
            <button onClick={handleReturnHome} className="return-home-btn767">Return to Home Page</button>
          </div>
        )}
      </div>
    );
};
export default RateABook;
