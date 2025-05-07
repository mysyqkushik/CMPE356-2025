import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./AdminDashboard.css";
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

const AdminDashboard = () => {
    const [books, setBooks] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [firstName, setFirstName] = useState("");
    const [genreFilter, setGenreFilter] = useState("");
    const [ratingFilter, setRatingFilter] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [filterType, setFilterType] = useState("");
    const [filterValue, setFilterValue] = useState("");
    const [sortOption, setSortOption] = useState("");

    const [showTable, setShowTable] = useState(false);
const [searchQuery, setSearchQuery] = useState("");


    const [showEditPopup, setShowEditPopup] = useState(false);
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [editUserId, setEditUserId] = useState("");
    const [deleteUserId, setDeleteUserId] = useState("");
    const [editUserData, setEditUserData] = useState(null);
    const [borrowedBooksList, setBorrowedBooksList] = useState([]);
    const [borrowedBooks, setBorrowedBooks] = useState([]);

    const [borrowedSearchTerm, setBorrowedSearchTerm] = useState("");
    const [borrowedSortOption, setBorrowedSortOption] = useState("");

    const [overdueSearchTerm, setOverdueSearchTerm] = useState("");
    const [overdueSortOption, setOverdueSortOption] = useState("");
    

    const [userId, setUserId] = useState("");

    const getOverdueBooks = () => {
        const cutoffDate = new Date("2025-04-09");
        return borrowedBooks.filter(borrow => 
            !borrow.Returned && new Date(borrow.returnDate) < cutoffDate
        );
    };

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

    useEffect(() => {
        axios
            .get("http://localhost:8080/api/users")
            .then((response) => setUsers(response.data))
            .catch((error) => console.error("Error fetching users:", error));
    }, []);

    const totalBooks = books.length;
    const booksBorrowed = borrowedBooks.length;
    const overdueBooks = getOverdueBooks().length;
    const newBooks = [...books]
        .sort((a, b) => b.ID - a.ID) // newest id = newest book
        .slice(-9) // get the last 9 added
        .reverse();

    const handleCardClick = (category) => {
        setSelectedCategory(category);
    };

    const getFilteredBooks = () => {
        let filtered = [...books];

        // Filter by category
        switch (selectedCategory) {
            case "total":
                break;
            case "borrowed":
                return borrowedBooks; // Return borrowed books directly without any filtering
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

        // Search by title or author
        filtered = filtered.filter(
            (book) =>
                book.title.toLowerCase().includes(searchTerm) ||
                book.author.toLowerCase().includes(searchTerm)
        );

        // Apply Filter Type
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

        // Sorting logic
        if (sortOption === "addedNewest") {
            filtered.reverse(); // reverse to show bottom entries first
        } else if (sortOption === "addedOldest") {
            // no need to change, default order
        }

        // Apply Sorting
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

        // Search by book title, username, user ID, or book ID
        if (borrowedSearchTerm) {
            filtered = filtered.filter(
                (borrow) =>
                    borrow.bookTitle.toLowerCase().includes(borrowedSearchTerm.toLowerCase()) ||
                    borrow.username.toLowerCase().includes(borrowedSearchTerm.toLowerCase()) ||
                    borrow.userId.toString().includes(borrowedSearchTerm) ||
                    borrow.bookId.toString().includes(borrowedSearchTerm)
            );
        }

        // Apply sorting
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

        // Search by book title, username, user ID, or book ID
        if (overdueSearchTerm) {
            filtered = filtered.filter(
                (borrow) =>
                    borrow.bookTitle.toLowerCase().includes(overdueSearchTerm.toLowerCase()) ||
                    borrow.username.toLowerCase().includes(overdueSearchTerm.toLowerCase()) ||
                    borrow.userId.toString().includes(overdueSearchTerm) ||
                    borrow.bookId.toString().includes(overdueSearchTerm)
            );
        }

        // Apply sorting
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

    const handleAddUser = () => {
        if (
            window.confirm(
                "You will be redirected to the signup page. Continue?"
            )
        ) {
            window.location.href = "/SignUp";
        }
    };

    const handleEditUser = () => {
        const id = prompt("Enter the ID of the user you want to edit:");
        if (id) {
            axios
                .get(`http://localhost:8080/api/users/${id}`)
                .then((response) => {
                    setEditUserData(response.data);
                    setEditUserId(id);
                    setShowEditForm(true);
                })
                .catch((err) => alert("User not found with this ID."));
        }
    };

    const handleEditSubmit = () => {
        const updatedUser = {
            ...editUserData,
            roles: editUserData.roles.map((role) => ({
                id: role.id,
                name: role.name,
            })),
        };

        axios
            .put(`http://localhost:8080/api/users/${editUserId}`, updatedUser)
            .then(() => {
                alert("User edits saved!");
                setShowEditForm(false);
                refreshUsers(); // re-fetch users list
            })
            .catch((err) => {
                console.error(
                    "Error saving user:",
                    err.response?.data || err.message
                );
                alert("Failed to save edits. Check required fields.");
            });
    };

    const handleDeleteUser = () => {
        const id = prompt("Enter the ID of the user you want to delete:");
        if (
            id &&
            window.confirm("Are you sure you want to delete this user?")
        ) {
            axios
                .delete(`http://localhost:8080/api/users/${id}`)
                .then(() => {
                    alert("User deleted successfully.");
                    refreshUsers();
                })
                .catch((err) => alert("User not found or delete failed."));
        }
    };

    const refreshUsers = () => {
        axios
            .get("http://localhost:8080/api/users")
            .then((response) => setUsers(response.data))
            .catch((error) => console.error("Error fetching users:", error));
    };

    return (
        <div className="dashboard-container">
            <aside className="sidebar">
                <div className="logo">Admin Dashboard</div>
                <nav>
                    <ul>
                        <li className="active">
                            <span>🏠</span> Statistics Panel
                        </li>
                        <li>
                            <span>📦</span>{" "}
                            <Link to="/ManageBooks">Book Inventory</Link>
                        </li>
                        <li>
                            <span>🔒</span>{" "}
                            <Link to="/AdminLogin">My User Details</Link>
                        </li>
                        <li>
                            <span>👥</span>{" "}
                            <Link to="/MUserDetails">Customer Requests</Link>
                        </li>
                        <li>
                            <span>📊</span> <Link to="/HomePage">Log Out</Link>
                        </li>
                    </ul>
                </nav>
            </aside>

            <div className="main-content">
                <header className="navbar3">
                    <div className="navbar-icons">
                        <NotificationBell userId={userId} />
                        <div className="icon-with-tooltip">
                            <span role="img" aria-label="email">📧</span>
                            <div className="tooltip">No emails yet!</div>
                        </div>
                    </div>

                    <div className="welcome-message">
                        <h2>
                            {firstName
                                ? `Welcome, ${firstName}`
                                : "Welcome, Admin"}
                        </h2>
                    </div>
                </header>

                <section className="dashboard-cards">
                    <div
                        className="card blue"
                        onClick={() => handleCardClick("total")}
                    >
                        <h3>Total Books in Library</h3>
                        <p className="big-number">{totalBooks}</p>
                    </div>
                    <div
                        className="card green"
                        onClick={() => handleCardClick("borrowed")}
                    >
                        <h3>Books Currently Borrowed</h3>
                        <p className="big-number">{booksBorrowed}</p>
                    </div>
                    <div
                        className="card yellow"
                        onClick={() => handleCardClick("due")}
                    >
                        <h3>Books Due for Return</h3>
                        <p className="big-number">{overdueBooks}</p>
                    </div>
                    <div
                        className="card red"
                        onClick={() => handleCardClick("new")}
                    >
                        <h3>New Book Arrivals</h3>
                        <p className="big-number">{newBooks.length}</p>
                    </div>
                    <div
                        className="card purple"
                        onClick={() => handleCardClick("users")}
                    >
                        <h3>View Users</h3>
                        <p className="big-number">{users.length}</p>
                    </div>
                </section>

                {selectedCategory && selectedCategory !== "users" && (
                    <section className="filtered-books">
                        <div className="filtered-header">
                            <h3 className="filtered-title">
                                {selectedCategory === "total" && "All Books"}
                                {selectedCategory === "borrowed" &&
                                    "Books Currently Borrowed"}
                                {selectedCategory === "due" && "Overdue Books"}
                                {selectedCategory === "new" &&
                                    "New Book Arrivals"}
                            </h3>
                            {selectedCategory !== "borrowed" && (
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
                                {/* Search and Filter Bar */}
                                <div className="search-filter-bar">
                                    <input
                                        type="text"
                                        placeholder="Search by Title or Author"
                                        onChange={(e) =>
                                            setSearchTerm(e.target.value.toLowerCase())
                                        }
                                        className="search-input"
                                    />

                                    {/* Filter By Dropdown */}
                                    <select
                                        onChange={(e) => {
                                            const [type, value] = e.target.value.split(
                                                ":"
                                            );
                                            setFilterType(type);
                                            setFilterValue(value);
                                        }}
                                        className="filter-dropdown"
                                    >
                                        <option value="">Filter by...</option>
                                        {/* Genre */}
                                        {[
                                            ...new Set(books.map((book) => book.genre)),
                                        ].map((genre, i) => (
                                            <option
                                                key={`genre-${i}`}
                                                value={`genre:${genre}`}
                                            >
                                                Genre: {genre}
                                            </option>
                                        ))}

                                        {/* Ratings (exact, not 5 & up) */}
                                        <option value="rating:1">Rating: 1 ⭐</option>
                                        <option value="rating:2">Rating: 2 ⭐⭐</option>
                                        <option value="rating:3">
                                            Rating: 3 ⭐⭐⭐
                                        </option>
                                        <option value="rating:4">
                                            Rating: 4 ⭐⭐⭐⭐
                                        </option>
                                        <option value="rating:5">
                                            Rating: 5 ⭐⭐⭐⭐⭐
                                        </option>

                                        {/* Added By */}
                                        <option value="addedBy:1">
                                            Added By: Admin
                                        </option>
                                        <option value="addedBy:2">
                                            Added By: Manager
                                        </option>
                                    </select>

                                    {/* Sort Dropdown */}
                                    <select
                                        onChange={(e) => setSortOption(e.target.value)}
                                        className="filter-dropdown"
                                    >
                                        <option value="">Sort by...</option>
                                        <option value="titleAZ">Book Title A-Z</option>
                                        <option value="authorAZ">Author A-Z</option>
                                        <option value="publicationOldest">
                                            Publication Date: Oldest First
                                        </option>
                                        <option value="publicationNewest">
                                            Publication Date: Newest First
                                        </option>
                                        <option value="quantityAsc">
                                            Quantity (Lowest First)
                                        </option>
                                        <option value="quantityDesc">
                                            Quantity (Highest First)
                                        </option>
                                    </select>

                                    <button
                                        className="clear-button"
                                        onClick={() => {
                                            setSearchTerm("");
                                            setGenreFilter("");
                                            setRatingFilter("");
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

{selectedCategory === "users" && (
    <section className="users-list">
        <h3>All Users</h3>

        <div className="user-actions">
            <button onClick={() => handleAddUser()}>➕ Add User</button>
            <button onClick={() => handleEditUser()}>✏️ Edit User</button>
            <button onClick={() => handleDeleteUser()}>🗑️ Delete User</button>
        </div>

        <div className="search-bar552">
            <input
                type="text"
                placeholder="🔍 Search by ID, username, or email"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="styled-search-input"
            />
        </div>

        <table>
            <thead>
                <tr>
                    <th>User ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Username</th>
                </tr>
            </thead>
            <tbody>
                {users
                    .filter((user) =>
                        user.id.toString().includes(searchQuery) ||
                        user.username?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        user.email?.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.email}</td>
                            <td>{user.username}</td>
                        </tr>
                    ))}
            </tbody>
        </table>
    </section>
)}


            </div>
            {showEditForm && editUserData && (
                <div className="popup-form872">
                    <div className="popup-content872">
                        <h3>Edit User ID: {editUserId}</h3>
                        <label>First Name:</label>
                        <input
                            type="text"
                            value={editUserData.firstName}
                            onChange={(e) =>
                                setEditUserData({
                                    ...editUserData,
                                    firstName: e.target.value,
                                })
                            }
                        />
                        <label>Last Name:</label>
                        <input
                            type="text"
                            value={editUserData.lastName}
                            onChange={(e) =>
                                setEditUserData({
                                    ...editUserData,
                                    lastName: e.target.value,
                                })
                            }
                        />
                        <label>Email:</label>
                        <input
                            type="email"
                            value={editUserData.email}
                            onChange={(e) =>
                                setEditUserData({
                                    ...editUserData,
                                    email: e.target.value,
                                })
                            }
                        />
                        <br />
                        <button onClick={handleEditSubmit}>Save</button>
                        <button onClick={() => setShowEditForm(false)}>
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
