import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './IssueBook.css';

const IssueBook = () => {
    const [books, setBooks] = useState([]);
    const [showTable, setShowTable] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('title');
    const [userId, setUserId] = useState('');
    const [bookId, setBookId] = useState('');
    const [issueDate, setIssueDate] = useState('');
    const [returnDate, setReturnDate] = useState('');
    const [message, setMessage] = useState({ text: '', type: '' });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/books');
                const availableBooks = response.data.filter(book => book.available);
                setBooks(availableBooks);
            } catch (error) {
                setMessage({ 
                    text: 'Error fetching books. Please try again later.', 
                    type: 'error' 
                });
            }
        };
        fetchBooks();
    }, []);

    const handleIssue = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/transactions', {
                userId: parseInt(userId),
                bookId: parseInt(bookId),
                issueDate,
                returnDate
            });
            
            if (response.status === 201) {
                setMessage({ 
                    text: 'Book issued successfully!', 
                    type: 'success' 
                });
                // Clear form
                setUserId('');
                setBookId('');
                setIssueDate('');
                setReturnDate('');
            }
        } catch (error) {
            let errorMessage = 'Error issuing book. Please try again.';
            if (error.response) {
                switch (error.response.status) {
                    case 400:
                        errorMessage = 'Invalid input. Please check your details.';
                        break;
                    case 404:
                        errorMessage = 'User or book not found.';
                        break;
                    case 409:
                        errorMessage = 'Book is not available or user has reached borrowing limit.';
                        break;
                    default:
                        errorMessage = 'Server error. Please try again later.';
                }
            }
            setMessage({ text: errorMessage, type: 'error' });
        }
    };

    const filteredBooks = books.filter(book => 
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const sortedBooks = [...filteredBooks].sort((a, b) => {
        if (sortBy === 'title') return a.title.localeCompare(b.title);
        if (sortBy === 'author') return a.author.localeCompare(b.author);
        return 0;
    });

    return (
        <div className="issue-container-439">
            <nav className="navbar-439">
                <div className="navbar-container-439">
                    <div className="navbar-brand-439">
                        <div className="navbar-owl-439">🦉</div>
                        <div className="navbar-title-439">Library<span>System</span></div>
                    </div>
                    <ul className="navbar-links-439">
                        <li><a href="/librarian-dashboard" className="navbar-link-439">Dashboard</a></li>
                        <li><a href="/" className="navbar-link-439">Logout</a></li>
                    </ul>
                </div>
            </nav>

            <h1 className="title-439">Issue Book</h1>

            <div className="issue-form-439">
                <h3>Issue Book Form</h3>
                <form onSubmit={handleIssue}>
                    <input
                        type="number"
                        placeholder="User ID"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        required
                    />
                    <input
                        type="number"
                        placeholder="Book ID"
                        value={bookId}
                        onChange={(e) => setBookId(e.target.value)}
                        required
                    />
                    <input
                        type="date"
                        value={issueDate}
                        onChange={(e) => setIssueDate(e.target.value)}
                        required
                    />
                    <input
                        type="date"
                        value={returnDate}
                        onChange={(e) => setReturnDate(e.target.value)}
                        required
                    />
                    <button type="submit" className="issue-btn-439">Issue Book</button>
                </form>
            </div>

            {message.text && (
                <div className={`issue-message-439 ${message.type}`}>
                    {message.text}
                </div>
            )}

            <button 
                className="see-books-btn-439" 
                onClick={() => setShowTable(!showTable)}
            >
                {showTable ? 'Hide Available Books' : 'Show Available Books'}
            </button>

            {showTable && (
                <>
                    <div className="search-sort-container-439">
                        <input
                            type="text"
                            placeholder="Search books..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="search-bar-439"
                        />
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="sort-dropdown-439"
                        >
                            <option value="title">Sort by Title</option>
                            <option value="author">Sort by Author</option>
                        </select>
                    </div>

                    <table className="book-table-439">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Title</th>
                                <th>Author</th>
                                <th>ISBN</th>
                                <th>Category</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedBooks.map(book => (
                                <tr key={book.id}>
                                    <td>{book.id}</td>
                                    <td>{book.title}</td>
                                    <td>{book.author}</td>
                                    <td>{book.isbn}</td>
                                    <td>{book.category}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}
        </div>
    );
};

export default IssueBook; 