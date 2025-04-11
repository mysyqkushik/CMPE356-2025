import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import ManageBar from './ManagerPages/ManageBar';
import Confetti from 'react-confetti';
import { useNavigate } from "react-router-dom";
import "./IssueBook.css";

const IssueBook = () => {
    const [books, setBooks] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("id");
  const [userId, setUserId] = useState("");
  const [bookId, setBookId] = useState("");
  const [borrowDate, setBorrowDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [message, setMessage] = useState({ text: "", type: "" });
    const navigate = useNavigate();
  const [isConfettiVisible, setConfettiVisible] = useState(false);

    useEffect(() => {
    axios.get("http://localhost:8080/api/books")
      .then(res => {
        const filtered = res.data.filter(book => book.id >= 100);
        const sorted = filtered.sort((a, b) => a.id - b.id);
        setBooks(sorted);
      })
      .catch(err => console.error("Error fetching books:", err));
    }, []);


  // Confetti effect
  useEffect(() => {
    if (message.type === 'success') {
      setConfettiVisible(true);
      setTimeout(() => setConfettiVisible(false), 5000); // Hide confetti after 5 seconds
    }
  }, [message]);


  useEffect(() => {
    if (borrowDate) {
      const borrow = new Date(borrowDate);
      borrow.setMonth(borrow.getMonth() + 1);
      const formattedDate = `${borrow.getDate().toString().padStart(2, '0')}/${(borrow.getMonth() + 1).toString().padStart(2, '0')}/${borrow.getFullYear()}`;
      setReturnDate(formattedDate);
    }
  }, [borrowDate]);
  

  const handleBorrow = () => {
    axios.post("http://localhost:8080/api/borrow/borrow", {
      userId: parseInt(userId),
      bookId: parseInt(bookId)
    }).then(res => {
      setMessage({ text: "Book borrowed successfully! To view, go to View Your Issued Books", type: "success" });
      // Clear form
      setUserId("");
      setBookId("");
      setBorrowDate("");
      setReturnDate("");
    }).catch(err => {
      setMessage({ text: "Error borrowing the book.", type: "error" });
    });
  };

  const filteredBooks = books.filter(book =>
                book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                book.author.toLowerCase().includes(searchTerm.toLowerCase())
            );

  const sortedBooks = [...filteredBooks].sort((a, b) => {
    const aVal = a[sortBy];
    const bVal = b[sortBy];
    if (typeof aVal === "string") {
      return aVal.localeCompare(bVal);
    }
    return aVal - bVal;
  });

    return (
    <div>
      <ManageBar />

      <div className="borrow-container-739">

        {/* Confetti */}
      {isConfettiVisible && <Confetti />}

        {/* BORROW FORM */}
        <div className="borrow-form-739"> 
          <h3>Issue a Book</h3>
          <input
            type="number"
            placeholder="Enter User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
          <input
            type="number"
            placeholder="Enter Book ID"
            value={bookId}
            onChange={(e) => setBookId(e.target.value)}
          />
                    <input
                        type="date"
            placeholder="Select Borrow Date"
                        value={borrowDate}
                        onChange={(e) => setBorrowDate(e.target.value)}
          />
          <input
            type="text"
            placeholder="Auto Return Date"
            value={returnDate}
            readOnly
          />
          <button className="borrow-btn-739" onClick={handleBorrow}>Issue to User</button>
            </div>

            {message.text && (
          <div className={`borrow-message-739 ${message.type}`}>
                    {message.text}
                </div>
            )}

        {/* BOOK LIST */}
        <button onClick={() => setShowTable(!showTable)} className="see-books-btn-739">
          {showTable ? "Hide Book List" : "See Book List"}
        </button>

        {showTable && (
          <>
            <div className="search-sort-container-739">
                <input
                    type="text"
                    placeholder="Search books..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                className="search-bar-739"
              />
              <select onChange={(e) => setSortBy(e.target.value)} className="sort-dropdown-739">
                <option value="id">Sort by Book ID</option>
                <option value="title">Sort by Title (A-Z)</option>
                    <option value="author">Sort by Author</option>
                    <option value="quantity">Sort by Quantity</option>
                    <option value="genre">Sort by Genre</option>
                </select>
                <button 
                onClick={() => {
                  setSearchTerm("");
                  setSortBy("id");
                }} 
                className="clear-filter-btn-739"
                >
                    Clear Filters
                </button>
            </div>

            <table className="book-table-739">
                <thead>
                    <tr>
                  <th>ID</th>
                        <th>Title</th>
                        <th>Author</th>
                  <th>Genre</th>
                        <th>Quantity</th>
                    </tr>
                </thead>
                <tbody>
                {sortedBooks.map(book => (
                  <tr key={book.id}>
                    <td>{book.id}</td>
                            <td>{book.title}</td>
                            <td>{book.author}</td>
                    <td>{book.genre}</td>
                            <td>{book.quantity}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
          </>
        )}
      </div>
        </div>
    );
};

export default IssueBook; 
