import React, { useState } from 'react';

const BorrowBook = () => {
  const [userId, setUserId] = useState('');
  const [bookId, setBookId] = useState('');
  const [message, setMessage] = useState('');

  const handleBorrow = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/borrow/borrow', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: parseInt(userId),
          bookId: parseInt(bookId)
        })
      });

      const text = await response.text();

      if (response.ok) {
        setMessage(`✅ ${text}`);
      } else {
        setMessage(`❌ ${text}`);
      }
    } catch (error) {
      console.error('Error borrowing book:', error);
      setMessage('❌ Error connecting to backend');
    }
  };

  return (
    <div style={{ padding: '30px', maxWidth: '400px', margin: 'auto', background: '#fefae0', borderRadius: '10px' }}>
      <h2 style={{ color: '#6b4226' }}>📚 Borrow a Book</h2>

      <div style={{ marginBottom: '10px' }}>
        <label>User ID:</label><br />
        <input
          type="number"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          style={{ width: '100%', padding: '8px' }}
        />
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label>Book ID:</label><br />
        <input
          type="number"
          value={bookId}
          onChange={(e) => setBookId(e.target.value)}
          style={{ width: '100%', padding: '8px' }}
        />
      </div>

      <button
        onClick={handleBorrow}
        style={{
          backgroundColor: '#d68c45',
          color: 'white',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer'
        }}
      >
        Borrow
      </button>

      {message && <p style={{ marginTop: '20px', fontWeight: 'bold' }}>{message}</p>}
    </div>
  );
};

export default BorrowBook;
