import React, { useState, useEffect } from "react";
import "./ManagerDashboard.css";
import { Link } from "react-router-dom";
import LibraryData from "./LibraryData";
import axios from "axios";
import { toast } from "react-toastify";

const NotificationBell = ({ userId }) => {
  const [unreadCount, setUnreadCount] = useState(0);
  const [showTooltip, setShowTooltip] = useState(false);

  const fetchUnreadCount = () => {
    if (userId) {
      axios
        .get(`http://localhost:8080/api/messages/unread-count/${userId}`)
        .then((res) => setUnreadCount(res.data))
        .catch((err) => console.error(err));
    }
  };

  useEffect(() => {
    fetchUnreadCount();
    const interval = setInterval(fetchUnreadCount, 30000);
    return () => clearInterval(interval);
  }, [userId]);

  const handleBellClick = (e) => {
    e.stopPropagation();
    setShowTooltip(!showTooltip);
  };

  const handleMarkAsRead = async (e) => {
    e.stopPropagation();
    if (unreadCount > 0) {
      try {
        await axios.put(`http://localhost:8080/api/messages/mark-read/${userId}`);
        setUnreadCount(0);
        toast.success("Notifications marked as read!");
      } catch (err) {
        console.error("Failed to mark messages as read:", err);
        toast.error("Failed to update notifications.");
      }
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (showTooltip && !e.target.closest('.notification-bell-wrapper')) {
        setShowTooltip(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showTooltip]);

  return (
    <div className="notification-bell-wrapper">
      <div 
        className="notification-bell" 
        onClick={handleBellClick}
      >
        <span role="img" aria-label="bell" className="bell-icon">🔔</span>
        {unreadCount > 0 && (
          <span className="unread-count">
            {unreadCount}
          </span>
        )}
      </div>
      
      {showTooltip && (
        <div className="notification-tooltip">
          {unreadCount > 0 ? (
            <>
              <div className="notification-message">
                You have {unreadCount} unread message(s)
              </div>
              <div className="notification-actions">
                <Link to="/ViewIssuedBooks" className="view-messages-link">
                  View Messages
                </Link>
                <button onClick={handleMarkAsRead} className="mark-read-link">
                  Mark as Read
                </button>
              </div>
            </>
          ) : (
            <div className="notification-message">
              No new notifications
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const ManagerDashboard = () => {
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [usersCount, setUsersCount] = useState(0);
  const [firstName, setFirstName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [borrowedBooksList, setBorrowedBooksList] = useState([]);
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [borrowedSearchTerm, setBorrowedSearchTerm] = useState("");
  const [borrowedSortOption, setBorrowedSortOption] = useState("");
  const [overdueSearchTerm, setOverdueSearchTerm] = useState("");
  const [overdueSortOption, setOverdueSortOption] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"));
    if (loggedInUser) {
      axios
        .get(
          `http://localhost:8080/api/users/profile/${loggedInUser.username}`
        )
        .then((response) => {
          setFirstName(response.data.first_name);
          setUserId(response.data.id);
        })
        .catch((error) =>
          console.error("Error fetching user data:", error)
        );
    }
  }, []);

  useEffect(() => {
    axios
        .get("http://localhost:8080/api/borrow/all")
        .then((response) => {
            setBorrowedBooksList(response.data);
            setBorrowedBooks(response.data);
        })
        .catch((error) =>
            console.error("Error fetching borrowed books:", error)
        );
  }, []);

  useEffect(() => {
    axios
        .get("http://localhost:8080/api/books")
        .then((response) => setBooks(response.data))
        .catch((error) => console.error("Error fetching books:", error));
  }, []);

  const getOverdueBooks = () => {
    const cutoffDate = new Date("2025-04-09");
    return borrowedBooks.filter(borrow => 
      !borrow.Returned && new Date(borrow.returnDate) < cutoffDate
    );
  };

  // Book Statistics
  const totalBooks = books.length;
  const booksBorrowed = borrowedBooks.length;
  const overdueBooks = getOverdueBooks().length;
  const newBooks = [...books]
    .sort((a, b) => b.ID - a.ID)
    .slice(-9)
    .reverse();

  const handleCardClick = (category) => {
    setSelectedCategory(category);
  };

  const getFilteredBooks = () => {
    let filtered = [...books];

    switch (selectedCategory) {
      case "total":
        break;
      case "borrowed":
        return borrowedBooks;
      case "due":
        filtered = filtered.filter(
          (book) =>
            book.dueDate && new Date(book.dueDate) < new Date()
        );
        break;
      case "new":
        filtered = newBooks;
        break;
      default:
        return [];
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (book) =>
          book.title.toLowerCase().includes(searchTerm) ||
          book.author.toLowerCase().includes(searchTerm)
      );
    }

    if (filterType && filterValue) {
      filtered = filtered.filter((book) => {
        switch (filterType) {
          case "genre":
            return book.genre === filterValue;
          case "rating":
            return parseInt(book.rating) === parseInt(filterValue);
          case "addedBy":
            return book.addedBy === parseInt(filterValue);
          default:
            return true;
        }
      });
    }

    switch (sortOption) {
      case "titleAZ":
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "authorAZ":
        filtered.sort((a, b) => a.author.localeCompare(b.author));
        break;
      case "publicationOldest":
        filtered.sort(
          (a, b) =>
            new Date(a.publicationDate) -
            new Date(b.publicationDate)
        );
        break;
      case "publicationNewest":
        filtered.sort(
          (a, b) =>
            new Date(b.publicationDate) -
            new Date(a.publicationDate)
        );
        break;
      case "quantityAsc":
        filtered.sort((a, b) => a.quantity - b.quantity);
        break;
      case "quantityDesc":
        filtered.sort((a, b) => b.quantity - a.quantity);
        break;
    }

    return filtered;
  };

  const getFilteredBorrowedBooks = () => {
    let filtered = [...borrowedBooks];

    if (borrowedSearchTerm) {
      filtered = filtered.filter(
        (borrow) =>
          borrow.bookTitle.toLowerCase().includes(borrowedSearchTerm.toLowerCase()) ||
          borrow.username.toLowerCase().includes(borrowedSearchTerm.toLowerCase()) ||
          borrow.userId.toString().includes(borrowedSearchTerm) ||
          borrow.bookId.toString().includes(borrowedSearchTerm)
      );
    }

    switch (borrowedSortOption) {
      case "bookTitleAZ":
        filtered.sort((a, b) => a.bookTitle.localeCompare(b.bookTitle));
        break;
      case "bookTitleZA":
        filtered.sort((a, b) => b.bookTitle.localeCompare(a.bookTitle));
        break;
      case "borrowDateNewest":
        filtered.sort((a, b) => new Date(b.borrowDate) - new Date(a.borrowDate));
        break;
      case "borrowDateOldest":
        filtered.sort((a, b) => new Date(a.borrowDate) - new Date(b.borrowDate));
        break;
      case "returnDateNewest":
        filtered.sort((a, b) => new Date(b.returnDate) - new Date(a.returnDate));
        break;
      case "returnDateOldest":
        filtered.sort((a, b) => new Date(a.returnDate) - new Date(b.returnDate));
        break;
      default:
        break;
    }

    return filtered;
  };

  const getFilteredOverdueBooks = () => {
    let filtered = getOverdueBooks();

    if (overdueSearchTerm) {
      filtered = filtered.filter(
        (borrow) =>
          borrow.bookTitle.toLowerCase().includes(overdueSearchTerm.toLowerCase()) ||
          borrow.username.toLowerCase().includes(overdueSearchTerm.toLowerCase()) ||
          borrow.userId.toString().includes(overdueSearchTerm) ||
          borrow.bookId.toString().includes(overdueSearchTerm)
      );
    }

    switch (overdueSortOption) {
      case "bookTitleAZ":
        filtered.sort((a, b) => a.bookTitle.localeCompare(b.bookTitle));
        break;
      case "bookTitleZA":
        filtered.sort((a, b) => b.bookTitle.localeCompare(a.bookTitle));
        break;
      case "returnDateNewest":
        filtered.sort((a, b) => new Date(b.returnDate) - new Date(a.returnDate));
        break;
      case "returnDateOldest":
        filtered.sort((a, b) => new Date(a.returnDate) - new Date(b.returnDate));
        break;
      default:
        break;
    }

    return filtered;
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="logo">Manager Dashboard</div>
        <nav>
          <ul>
            <li className="active"><span>🏠</span> Statistics Panel</li>
            <li><span>📦</span> <Link to="/ManagerAddBook">Book Inventory</Link></li>
            <li><span>🔒</span> <Link to="/CustomerLogin">My User Details</Link></li>
            <li>
                                        <span>👥</span>{" "}
                                        <Link to="/MUserDetails">Customer Requests</Link>
                                    </li>
            <li><span>📊</span> <Link to="/HomePage">Log Out</Link></li>
          </ul>
        </nav>
      </aside>

      <div className="main-content1">
        <header className="navbar3">
          <div className="navbar-icons">
            <NotificationBell userId={userId} />
            <div className="icon-with-tooltip">
              <span role="img" aria-label="email">📧</span>
              <div className="tooltip">No emails yet!</div>
            </div>
          </div>
          <div className="welcome-message">
            <h2>Welcome, {firstName ? firstName : "Manager"}!</h2>
          </div>
        </header>

        <section className="dashboard-cards">
          <div className="card blue" onClick={() => handleCardClick("total")}>
            <h3>Total Books in Library</h3>
            <p className="big-number">{totalBooks}</p>
          </div>
          <div className="card green" onClick={() => handleCardClick("borrowed")}>
            <h3>Books Currently Borrowed</h3>
            <p className="big-number">{booksBorrowed}</p>
          </div>
          <div className="card yellow" onClick={() => handleCardClick("due")}>
            <h3>Books Due for Return</h3>
            <p className="big-number">{overdueBooks}</p>
          </div>
          <div className="card red" onClick={() => handleCardClick("new")}>
            <h3>New Book Arrivals</h3>
            <p className="big-number">{newBooks.length}</p>
          </div>
        </section>

        {selectedCategory && (
          <section className="filtered-books">
            <div className="filtered-header">
              <h3 className="filtered-title">
                {selectedCategory === "total" && "All Books"}
                {selectedCategory === "borrowed" && "Books Currently Borrowed"}
                {selectedCategory === "due" && "Overdue Books"}
                {selectedCategory === "new" && "New Book Arrivals"}
              </h3>
              {selectedCategory !== "borrowed" && selectedCategory !== "due" && (
                <Link
                  to="/ManageBooks"
                  className="edit-button-small"
                >
                  Edit
                </Link>
              )}
            </div>

            {selectedCategory === "borrowed" ? (
              <div className="borrowed-books-table">
                <div className="borrowed-filters">
                  <input
                    type="text"
                    placeholder="Search by book title, username, user ID, or book ID"
                    value={borrowedSearchTerm}
                    onChange={(e) => setBorrowedSearchTerm(e.target.value)}
                    className="search-input"
                  />
                  <select
                    value={borrowedSortOption}
                    onChange={(e) => setBorrowedSortOption(e.target.value)}
                    className="filter-dropdown"
                  >
                    <option value="">Sort by...</option>
                    <option value="bookTitleAZ">Book Title (A-Z)</option>
                    <option value="bookTitleZA">Book Title (Z-A)</option>
                    <option value="borrowDateNewest">Borrow Date (Newest)</option>
                    <option value="borrowDateOldest">Borrow Date (Oldest)</option>
                    <option value="returnDateNewest">Return Date (Newest)</option>
                    <option value="returnDateOldest">Return Date (Oldest)</option>
                  </select>
                  <button
                    className="clear-button"
                    onClick={() => {
                      setBorrowedSearchTerm("");
                      setBorrowedSortOption("");
                    }}
                  >
                    Clear Filters
                  </button>
                </div>
                {getFilteredBorrowedBooks().length === 0 ? (
                  <p>No books currently borrowed.</p>
                ) : (
                  <table>
                    <thead>
                      <tr>
                        <th>Borrow ID</th>
                        <th>User ID</th>
                        <th>User Name</th>
                        <th>Book ID</th>
                        <th>Book Title</th>
                        <th>Borrow Date</th>
                        <th>Return Date</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {getFilteredBorrowedBooks().map((borrow) => (
                        <tr key={borrow.id}>
                          <td>{borrow.id}</td>
                          <td>{borrow.userId}</td>
                          <td>{borrow.username}</td>
                          <td>{borrow.bookId}</td>
                          <td>{borrow.bookTitle}</td>
                          <td>{borrow.borrowDate}</td>
                          <td>{borrow.returnDate}</td>
                          <td>
                            {borrow.Returned
                              ? "Returned"
                              : new Date(borrow.returnDate) < new Date("2025-04-09")
                              ? "Overdue"
                              : "Borrowed"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            ) : selectedCategory === "due" ? (
              <div className="overdue-books-table">
                <div className="overdue-filters">
                  <input
                    type="text"
                    placeholder="Search by book title, username, user ID, or book ID"
                    value={overdueSearchTerm}
                    onChange={(e) => setOverdueSearchTerm(e.target.value)}
                    className="search-input"
                  />
                  <select
                    value={overdueSortOption}
                    onChange={(e) => setOverdueSortOption(e.target.value)}
                    className="filter-dropdown"
                  >
                    <option value="">Sort by...</option>
                    <option value="bookTitleAZ">Book Title (A-Z)</option>
                    <option value="bookTitleZA">Book Title (Z-A)</option>
                    <option value="returnDateNewest">Return Date (Newest)</option>
                    <option value="returnDateOldest">Return Date (Oldest)</option>
                  </select>
                  <button
                    className="clear-button"
                    onClick={() => {
                      setOverdueSearchTerm("");
                      setOverdueSortOption("");
                    }}
                  >
                    Clear Filters
                  </button>
                </div>
                {getFilteredOverdueBooks().length === 0 ? (
                  <p>No overdue books found.</p>
                ) : (
                  <table>
                    <thead>
                      <tr>
                        <th>Borrow ID</th>
                        <th>User ID</th>
                        <th>User Name</th>
                        <th>Book ID</th>
                        <th>Book Title</th>
                        <th>Borrow Date</th>
                        <th>Return Date</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {getFilteredOverdueBooks().map((borrow) => (
                        <tr key={borrow.id}>
                          <td>{borrow.id}</td>
                          <td>{borrow.userId}</td>
                          <td>{borrow.username}</td>
                          <td>{borrow.bookId}</td>
                          <td>{borrow.bookTitle}</td>
                          <td>{borrow.borrowDate}</td>
                          <td>{borrow.returnDate}</td>
                          <td>Overdue</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            ) : (
              <>
                <div className="search-filter-bar">
                  <input
                    type="text"
                    placeholder="Search by Title or Author"
                    onChange={(e) =>
                      setSearchTerm(e.target.value.toLowerCase())
                    }
                    className="search-input"
                  />

                  <select
                    onChange={(e) => {
                      const [type, value] = e.target.value.split(":");
                      setFilterType(type);
                      setFilterValue(value);
                    }}
                    className="filter-dropdown"
                  >
                    <option value="">Filter by...</option>
                    {[...new Set(books.map((book) => book.genre))].map((genre, i) => (
                      <option
                        key={`genre-${i}`}
                        value={`genre:${genre}`}
                      >
                        Genre: {genre}
                      </option>
                    ))}

                    <option value="rating:1">Rating: 1 ⭐</option>
                    <option value="rating:2">Rating: 2 ⭐⭐</option>
                    <option value="rating:3">Rating: 3 ⭐⭐⭐</option>
                    <option value="rating:4">Rating: 4 ⭐⭐⭐⭐</option>
                    <option value="rating:5">Rating: 5 ⭐⭐⭐⭐⭐</option>

                    <option value="addedBy:1">Added By: Admin</option>
                    <option value="addedBy:2">Added By: Manager</option>
                  </select>

                  <select
                    onChange={(e) => setSortOption(e.target.value)}
                    className="filter-dropdown"
                  >
                    <option value="">Sort by...</option>
                    <option value="titleAZ">Book Title A-Z</option>
                    <option value="authorAZ">Author A-Z</option>
                    <option value="publicationOldest">Publication Date: Oldest First</option>
                    <option value="publicationNewest">Publication Date: Newest First</option>
                    <option value="quantityAsc">Quantity (Lowest First)</option>
                    <option value="quantityDesc">Quantity (Highest First)</option>
                  </select>

                  <button
                    className="clear-button"
                    onClick={() => {
                      setSearchTerm("");
                      setFilterType("");
                      setFilterValue("");
                      setSortOption("");
                    }}
                  >
                    Clear Filters
                  </button>
                </div>

                <table>
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Author</th>
                      <th>Genre</th>
                      <th>Publication Date</th>
                      <th>Quantity</th>
                      <th>Added By</th>
                      <th>Ratings</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getFilteredBooks().map((book) => (
                      <tr key={book.id}>
                        <td>{book.title}</td>
                        <td>{book.author}</td>
                        <td>{book.genre}</td>
                        <td>{book.publicationDate}</td>
                        <td>{book.quantity}</td>
                        <td>
                          {book.addedBy === 1
                            ? "Admin"
                            : book.addedBy === 2
                            ? "Manager"
                            : "Unknown"}
                        </td>
                        <td>{book.rating}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )}
          </section>
        )}
      </div>
    </div>
  );
};

export default ManagerDashboard;
