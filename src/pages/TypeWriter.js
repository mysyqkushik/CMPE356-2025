import React, { useState, useEffect } from 'react';

const Typewriter = ({ text }) => {
  const [displayText, setDisplayText] = useState('');
  const [index, setIndex] = useState(0); // Manage the index with state

  useEffect(() => {
    if (index < text.length) {
      const interval = setInterval(() => {
        setDisplayText((prev) => prev + text[index]); // Add the next character
        setIndex((prevIndex) => prevIndex + 1); // Increment the index
      }, 30); // Typing speed

      return () => clearInterval(interval); // Cleanup on unmount or change
    }
  }, [index, text]); // Depend on index and text

  return <h1>{displayText}</h1>;
};

export default Typewriter;
