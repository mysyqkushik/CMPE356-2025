import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./AdminDashboard.css";
import axios from "axios";

const AdminDashboard = () => {
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [firstName, setFirstName] = useState("");
const [genreFilter, setGenreFilter] = useState('');
const [ratingFilter, setRatingFilter] = useState('');
const [searchTerm, setSearchTerm] = useState('');
const [filterType, setFilterType] = useState('');
const [filterValue, setFilterValue] = useState('');
const [sortOption, setSortOption] = useState('');



  useEffect(() => {
    const loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"));
    if (loggedInUser) {
      axios.get(`http://localhost:8080/api/users/profile/${loggedInUser.username}`)
        .then(response => {
          setFirstName(response.data.first_name); // Fetch first_name
        })
        .catch(error => console.error("Error fetching user data:", error));
    }
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
  const booksBorrowed = books.filter((book) => book.status === "borrowed").length;
  const overdueBooks = books.filter(
    (book) => book.dueDate && new Date(book.dueDate) < new Date()
  ).length;

  const newBooks = [...books]
  .sort((a, b) => b.ID - a.ID) // newest id = newest book
  .slice(-9)                   // get the last 9 added
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
        filtered = filtered.filter(book => book.status === "borrowed");
        break;
      case "due":
        filtered = filtered.filter(book => book.dueDate && new Date(book.dueDate) < new Date());
        break;
      case "new":
        filtered = newBooks;
        break;
      default:
        return [];
    }
  
    // Search by title or author
filtered = filtered.filter((book) =>
  book.title.toLowerCase().includes(searchTerm) ||
  book.author.toLowerCase().includes(searchTerm)
);

  
    // Apply Filter Type
    if (filterType && filterValue) {
      filtered = filtered.filter(book => {
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
        filtered.sort((a, b) => new Date(a.publicationDate) - new Date(b.publicationDate));
        break;
      case "publicationNewest":
        filtered.sort((a, b) => new Date(b.publicationDate) - new Date(a.publicationDate));
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
  

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="logo">Admin Dashboard</div>
        <nav>
          <ul>
            <li className="active"><span>🏠</span> Statistics Panel</li>
            <li><span>📦</span> <Link to="/ManageBooks">Book Inventory</Link></li>
            <li><span>🔒</span> <Link to="/ErrorNotFound">Key Metrics</Link></li>
            <li><span>👥</span> <Link to="/ErrorNotFound">User Requests</Link></li>
            <li><span>📊</span> <Link to="/HomePage">Log Out</Link></li>
          </ul>
        </nav>
      </aside>

      <div className="main-content">
        <header className="navbar3">
        <div className="navbar-icons">
  <div className="icon-with-tooltip">
    <span role="img" aria-label="bell">🔔</span>
    <div className="tooltip">
    <div>No</div>
    <div>Notifications!</div>
    </div>
  </div>
  <div className="icon-with-tooltip">
    <span role="img" aria-label="email">📧</span>
    <div className="tooltip">No emails yet!</div>
  </div>
</div>

          <div className="welcome-message">
            <h2>{firstName ? `Welcome, ${firstName}` : "Welcome, Admin"}</h2>
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
          <div className="card purple" onClick={() => handleCardClick("users")}>
            <h3>View Users</h3>
            <p className="big-number">{users.length}</p>
          </div>
        </section>

        {selectedCategory && selectedCategory !== "users" && (
          <section className="filtered-books">
          <div className="filtered-header">
            <h3 className="filtered-title">
              {selectedCategory === "total" && "All Books"}
         {selectedCategory === "borrowed" && "Books Currently Borrowed"}
                      {selectedCategory === "due" && "Overdue Books"}
                      {selectedCategory === "new" && "New Book Arrivals"}
            </h3>
            <Link to="/ManageBooks" className="edit-button-small">Edit</Link>
          </div>



          {/* Search and Filter Bar */}
          <div className="search-filter-bar">
  <input
    type="text"
    placeholder="Search by Title or Author"
    onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
    className="search-input"
  />

  {/* Filter By Dropdown */}
  <select
    onChange={(e) => {
      const [type, value] = e.target.value.split(":");
      setFilterType(type);
      setFilterValue(value);
    }}
    className="filter-dropdown"
  >
    <option value="">Filter by...</option>
    {/* Genre */}
    {[...new Set(books.map(book => book.genre))].map((genre, i) => (
      <option key={`genre-${i}`} value={`genre:${genre}`}>Genre: {genre}</option>
    ))}

    {/* Ratings (exact, not 5 & up) */}
    <option value="rating:1">Rating: 1 ⭐</option>
    <option value="rating:2">Rating: 2 ⭐⭐</option>
    <option value="rating:3">Rating: 3 ⭐⭐⭐</option>
    <option value="rating:4">Rating: 4 ⭐⭐⭐⭐</option>
    <option value="rating:5">Rating: 5 ⭐⭐⭐⭐⭐</option>

    {/* Added By */}
    <option value="addedBy:1">Added By: Admin</option>
    <option value="addedBy:2">Added By: Manager</option>
  </select>

  {/* Sort Dropdown */}
  <select
  onChange={(e) => setSortOption(e.target.value)}
  className="filter-dropdown"
>
  <option value="">Sort by...</option>
  <option value="titleAZ">Book Title A-Z</option>
  <option value="authorAZ">Author A-Z</option>
  <option value="publicationOldest">Publication Date: Oldest First</option>
  <option value="publicationNewest">Publication Date: Newest First</option>
  <option value="addedOldest">Added Oldest</option>
  <option value="addedNewest">Added Newest</option>
  <option value="quantityAsc">Quantity (Lowest First)</option>
  <option value="quantityDesc">Quantity (Highest First)</option>
</select>


  <button
  className="clear-button"
  onClick={() => {
    setSearchTerm('');
    setGenreFilter('');
    setRatingFilter('');
    setFilterType('');
    setFilterValue('');
    setSortOption('');
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
                    <td>{book.addedBy === 1 ? "Admin" : book.addedBy === 2 ? "Manager" : "Unknown"}</td>
                    <td>{book.rating}</td>

                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}

        {selectedCategory === "users" && (
          <section className="users-list">
            <h3>All Users</h3>
            <table>
              <thead>
                <tr>
                  <th>User ID</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.firstName}</td> {/* fixed field name */}
                    <td>{user.lastName}</td>   {/* fixed field name */}
                    <td>{user.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
