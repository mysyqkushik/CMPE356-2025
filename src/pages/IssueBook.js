import React, { useState, useEffect } from 'react';
import ManageBar from './ManageBar'; 
import './IssueBook.css'; 

const IssueBook = () => {
    const [students, setStudents] = useState([
        { name: 'Harry Potter' },
        { name: 'Hermione Granger' },
        { name: 'Ron Weasley' },
        { name: 'Draco Malfoy' },
        { name: 'Luna Lovegood' },
        { name: 'Neville Longbottom' },
        { name: 'Ginny Weasley' },
        { name: 'Albus Dumbledore' },
        { name: 'Severus Snape' },
    ]);    
    const [books, setBooks] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState('');
    const [selectedBookId, setSelectedBookId] = useState('');
    const [issueDate, setIssueDate] = useState('');

    useEffect(() => {
        const savedBooks = JSON.parse(localStorage.getItem('books')) || [];
        setBooks(savedBooks);
    }, []);

    const handleSelectedStudentChange = (e) => {
        setSelectedStudent(e.target.value);
    };

    const handleSelectedBookChange = (e) => {
        setSelectedBookId(e.target.value);
    };

    const handleIssueDateChange = (e) => {
        setIssueDate(e.target.value);
    };

    const handleIssueBook = () => {
        if (!selectedStudent || !selectedBookId || !issueDate) {
            alert('Please fill in all fields.');
            return;
        }

        const book = books.find(b => b.id === parseInt(selectedBookId)) || {};
        const issuedBook = {
            student: selectedStudent,
            bookTitle: book.title || 'Unknown Title',
            author: book.author || 'Unknown Author',
            issueDate: issueDate,
        };

        const existingIssues = JSON.parse(localStorage.getItem('issuedBooks')) || [];
        const updatedIssues = [...existingIssues, issuedBook];
        localStorage.setItem('issuedBooks', JSON.stringify(updatedIssues));

        setSelectedStudent('');
        setSelectedBookId('');
        setIssueDate('');
    };

    return (
        <>
            <ManageBar /> 
            <div className="issue-book-container">
                <div className="card">
                    <div className="card-body">
                        <h2 className="card-title">Issue Book</h2>
                        <form>
                            <div className="form-group">
                                <label htmlFor="student">Select User</label>
                                <select
                                    id="student"
                                    className="form-select"
                                    value={selectedStudent}
                                    onChange={handleSelectedStudentChange}
                                >
                                    <option value="">Select User</option>
                                    {students.map((student, index) => (
                                        <option key={index} value={student.name}>
                                            {student.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group mt-3">
                                <label htmlFor="book">Select Book</label>
                                <select
                                    id="book"
                                    className="form-select"
                                    value={selectedBookId}
                                    onChange={handleSelectedBookChange}
                                >
                                    <option value="">Select Book</option>
                                    {books.map((book) => (
                                        <option key={book.id} value={book.id}>
                                            {book.title} - {book.author}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group mt-3">
                                <label htmlFor="issueDate">Issue Date</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    id="issueDate"
                                    value={issueDate}
                                    onChange={handleIssueDateChange}
                                />
                            </div>
                            <button
                                type="button"
                                className="btn btn-primary mt-3"
                                onClick={handleIssueBook}
                            >
                                Issue Book
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default IssueBook;
