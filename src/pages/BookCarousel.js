import React, { useState, useEffect } from 'react';
import './BookCarousel.css';

const BookCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const books = [
        'comedy (1).png',
        'logo512.png',
        'logo192.png',
        'comedy (1).png',
        'logo512.png',
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % books.length);
        }, 500); // 0.7 seconds interval

        return () => clearInterval(interval); 
    }, [books.length]);

    return (
        <div className="carousel-container">
            <div className="carousel">
                <img
                    src={books[currentIndex]}
                    alt={`Book ${currentIndex + 1}`}
                    className="carousel-image"
                />
            </div>
        </div>
    );
};

export default BookCarousel;
