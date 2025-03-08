import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./BookRatings.css";

const books = [
  { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", image: "/thegreatgatsby.jpg", rating: 3 },
  { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee", image: "/tokillamockingbird.jpg", rating: 5 },
  { id: 3, title: "1984", author: "George Orwell", image: "/1984.jpg", rating: 5 },
  { id: 4, title: "Moby-Dick", author: "Herman Melville", image: "/mobydick.jpg", rating: 4 },
  { id: 5, title: "Pride and Prejudice", author: "Jane Austen", image: "/p&p.jpg", rating: 5 },
  { id: 6, title: "Animal Farm", author: "George Orwell", image: "/animalfarm.jpg", rating: 5 },
  { id: 7, title: "Game of Thrones", author: "George R. R. Martin", image: "/got.jpg", rating: 5 },
  { id: 8, title: "War and Peace", author: "Leo Tolstoy", image: "/war&peace.jpg", rating: 3 },
  { id: 9, title: "Crime and Punishment", author: "Fyodor Dostoevsky", image: "/crime.jpg", rating: 3 },
  { id: 10, title: "The Lord of the Rings", author: "J.R.R. Tolkien", image: "/lotr.jpg", rating: 3 },
  { id: 11, title: "Yellowface", author: "R.F. Kuang", image: "/yellowface.jpg", rating: 4 },
  { id: 12, title: "Fourth Wing", author: "Rebecca Yarros", image: "/fourthwing.jpg", rating: 3 },
  { id: 13, title: "Wuthering Heights", author: "Emily Brontë", image: "/wutheringheights.jpg", rating: 5 },
  { id: 14, title: "The Odyssey", author: "Homer", image: "/theodyssey.jpg", rating: 5 },
  { id: 15, title: "The Brothers Karamazov", author: "Fyodor Dostoevsky", image: "/brothers.jpg", rating: 4 },
  { id: 16, title: "Beautiful World, Where Are You", author: "Sally Rooney", image: "/sallyrooney.jpg", rating: 3 },
  { id: 17, title: "The Man Who Died Twice", author: "Richard Osman", image: "/richardosman.jpg", rating: 3 },
  { id: 18, title: "Severance", author: "Ling Ma", image: "/severance.jpg", rating: 3 },
  { id: 19, title: "House of Sky and Breath", author: "Sarah J. Maas", image: "/sarahjmaas.jpg", rating: 4 },
  { id: 20, title: "Tomorrow, and Tomorrow, and Tomorrow", author: "Gabrielle Zevin", image: "/tomo.jpg", rating: 3 },
  { id: 21, title: "The Bullet That Missed", author: "Richard Osman",  image: "/richardosman2.jpg", rating: 3 },
  { id: 22, title: "Bliss Montage", author: "Ling Ma", image: "/blissmontage.jpg", rating: 3 }
];

const BookRatings = () => {
  const navigate = useNavigate();
  
  // Rate a Book butonuna manuel olarak tıklama olayı ekleyen fonksiyon
  useEffect(() => {
    const rateButton = document.querySelector('.rateButton834');
    
    if (rateButton) {
      // Eski event listener'ları temizle
      const oldClone = rateButton.cloneNode(true);
      rateButton.parentNode.replaceChild(oldClone, rateButton);
      
      // Yeni bir event listener ekle
      const newButton = document.querySelector('.rateButton834');
      newButton.addEventListener('click', function() {
        window.location.href = '/RateABook';
      });
    }
    
    // Çıkış anında temizleme
    return () => {
      const rateButton = document.querySelector('.rateButton834');
      if (rateButton) {
        const clone = rateButton.cloneNode(true);
        rateButton.parentNode.replaceChild(clone, rateButton);
      }
    };
  }, []);
  
  // Normal buton tıklama fonksiyonu
  const goToRateABook = () => {
    window.location.href = '/RateABook';
  };
  
  return (
    <div className="bookRatingsContainer834">
      {/* Inline style ve href özelliği olan buton */}
      <a 
        href="/RateABook" 
        className="rateButton834"
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          padding: '10px 15px',
          backgroundColor: '#ffcc00',
          color: 'black',
          border: 'none',
          cursor: 'pointer',
          borderRadius: '5px',
          fontWeight: 'bold',
          textDecoration: 'none',
          display: 'block',
          zIndex: 1000
        }}
      >
        Rate a Book
      </a>
      
      <h1 className="title834">Book Ratings</h1>
      <h2 className="subtitle834">
        These ratings have been collected from popular book review sites such as Goodreads.
      </h2>

      <div className="bookList834">
        {books.map((book) => (
          <div key={book.id} className="bookCard834">
            <img src={book.image} alt={book.title} className="bookImage834" />
            <h3 className="bookTitle834">{book.title}</h3>
            <p className="bookAuthor834">{book.author}</p>
            <div className="stars834">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={`star834 ${i < book.rating ? "filled834" : "empty834"}`}>★</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <button className="homeButton834" onClick={() => navigate("/Homepage")}>
        Return to Home Page
      </button>
      
    </div>
  );
};

export default BookRatings;