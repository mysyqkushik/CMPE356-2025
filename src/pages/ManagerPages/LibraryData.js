const libraryData = {
  books: [
    { 
      id: 1, 
      title: "The Great Gatsby", 
      author: "F. Scott Fitzgerald", 
      publishedDate: "1925-04-10", 
      quantity: 5, 
      status: "available", 
      category: "Classic", 
      dueDate: null,
      borrower: null 
    },
    { 
      id: 2, 
      title: "To Kill a Mockingbird", 
      author: "Harper Lee", 
      publishedDate: "1960-07-11", 
      quantity: 8, 
      status: "borrowed", 
      category: "Literary", 
      dueDate: "2025-03-01", 
      borrower: "Harry Potter"
    },
    { 
      id: 3, 
      title: "1984", 
      author: "George Orwell", 
      publishedDate: "1949-06-08", 
      quantity: 4, 
      status: "available", 
      category: "Classic", 
      dueDate: null,
      borrower: null 
    },
    { 
      id: 4, 
      title: "Moby-Dick", 
      author: "Herman Melville", 
      publishedDate: "1851-10-18", 
      quantity: 3, 
      status: "available", 
      category: "Classic", 
      dueDate: null,
      borrower: null 
    },
    { 
      id: 5, 
      title: "Pride and Prejudice", 
      author: "Jane Austen", 
      publishedDate: "1813-01-28", 
      quantity: 6, 
      status: "borrowed", 
      category: "Romance", 
      dueDate: "2025-03-14", 
      borrower: "Hermione Granger"
    },
    { 
      id: 6, 
      title: "Animal Farm", 
      author: "George Orwell", 
      publishedDate: "1949-06-08", 
      quantity: 9, 
      status: "available", 
      category: "Classic", 
      dueDate: null,
      borrower: null 
    },
    { 
      id: 7, 
      title: "Game of Thrones", 
      author: "George R. R. Martin", 
      publishedDate: "1996-08-01", 
      quantity: 20, 
      status: "borrowed", 
      category: "Fantasy", 
      dueDate: "2025-03-02", 
      borrower: "Harry Potter"
    },
    { 
      id: 8, 
      title: "War and Peace", 
      author: "Leo Tolstoy", 
      publishedDate: "1869-01-01", 
      quantity: 2, 
      status: "available", 
      category: "Historical", 
      dueDate: null,
      borrower: null 
    },
    { 
      id: 9, 
      title: "Crime and Punishment", 
      author: "Fyodor Dostoevsky", 
      publishedDate: "1866-11-01", 
      quantity: 5, 
      status: "available", 
      category: "Crime", 
      dueDate: null,
      borrower: null 
    },
    { 
      id: 10, 
      title: "The Lord of the Rings", 
      author: "J.R.R. Tolkien", 
      publishedDate: "1954-07-29", 
      quantity: 9, 
      status: "borrowed", 
      category: "Fantasy", 
      dueDate: "2025-03-16", 
      borrower: "Luna Lovegood"
    },
    { 
      id: 11, 
      title: "Yellowface", 
      author: "R.F. Kuang", 
      publishedDate: "2023-05-16", 
      quantity: 7, 
      status: "available", 
      category: "Thriller", 
      dueDate: null,
      borrower: null 
    },
    { 
      id: 12, 
      title: "Fourth Wing", 
      author: "Rebecca Yarros", 
      publishedDate: "2023-05-02", 
      quantity: 10, 
      status: "available", 
      category: "Fantasy", 
      dueDate: null,
      borrower: null 
    },
    { 
      id: 13, 
      title: "Wuthering Heights", 
      author: "Emily Brontë", 
      publishedDate: "1847-12-17", 
      quantity: 3, 
      status: "borrowed", 
      category: "Romance", 
      dueDate: "2025-03-19", 
      borrower: "Hermione Granger"
    },
    { 
      id: 14, 
      title: "The Odyssey", 
      author: "Homer", 
      publishedDate: null, 
      quantity: 2, 
      status: "available", 
      category: "Classic", 
      dueDate: null,
      borrower: null 
    },
    { 
      id: 15, 
      title: "The Brothers Karamazov", 
      author: "Fyodor Dostoevsky", 
      publishedDate: "1880-11-01", 
      quantity: 4, 
      status: "available", 
      category: "Classic", 
      dueDate: null,
      borrower: null 
    },
    { 
      id: 16, 
      title: "Beautiful World, Where Are You", 
      author: "Sally Rooney", 
      publishedDate: "2021-09-07", 
      quantity: 6, 
      status: "borrowed", 
      category: "Literary", 
      dueDate: "2025-03-14", 
      borrower: "Hermione Granger"
    },
    { 
      id: 17, 
      title: "The Man Who Died Twice", 
      author: "Richard Osman", 
      publishedDate: "2021-09-16", 
      quantity: 7, 
      status: "available", 
      category: "Mystery", 
      dueDate: null,
      borrower: null 
    },
    { 
      id: 18, 
      title: "Severance", 
      author: "Ling Ma", 
      publishedDate: "2019-05-07", 
      quantity: 5, 
      status: "available", 
      category: "Thriller", 
      dueDate: null,
      borrower: null 
    },
    { 
      id: 19, 
      title: "House of Sky and Breath", 
      author: "Sarah J. Maas", 
      publishedDate: "2022-02-15", 
      quantity: 9, 
      status: "available", 
      category: "Fantasy", 
      dueDate: null,
      borrower: null 
    },
    { 
      id: 20, 
      title: "Tomorrow, and Tomorrow, and Tomorrow", 
      author: "Gabrielle Zevin", 
      publishedDate: "2022-07-05", 
      quantity: 6, 
      status: "available", 
      category: "Literary", 
      dueDate: null,
      borrower: null 
    },
    { 
      id: 21, 
      title: "The Bullet That Missed", 
      author: "Richard Osman", 
      publishedDate: "2022-09-15", 
      quantity: 4, 
      status: "borrowed", 
      category: "Mystery", 
      dueDate: "2025-03-22", 
      borrower: "Draco Malfoy"
    },
    { 
      id: 22, 
      title: "Bliss Montage", 
      author: "Ling Ma", 
      publishedDate: "2022-09-13", 
      quantity: 3, 
      status: "available", 
      category: "Literary", 
      dueDate: null,
      borrower: null 
    }
  ],
  
    users: [
      { 
        id: 1, 
        name: "Harry Potter", 
        email: "harry.potter@hogwarts.com", 
        phone: "123-456-7890", 
        borrowedBooks: ["To Kill a Mockingbird", "Game of Thrones"]
      },
      { 
        id: 2, 
        name: "Hermione Granger", 
        email: "hermione.granger@hogwarts.com", 
        phone: "987-654-3210", 
        borrowedBooks: ["Pride and Prejudice", "Yellowface", "Jane Eyre", "Wuthering Heights"]
      },
      { 
        id: 3, 
        name: "Ron Weasley", 
        email: "ron.weasley@hogwarts.com", 
        phone: "555-123-9876", 
        borrowedBooks: []
      },
      { 
        id: 4, 
        name: "Draco Malfoy", 
        email: "draco.malfoy@hogwarts.com", 
        phone: "444-555-6666", 
        borrowedBooks: ["War and Peace"]
      },
      { 
        id: 5, 
        name: "Luna Lovegood", 
        email: "luna.lovegood@hogwarts.com", 
        phone: "111-222-3333", 
        borrowedBooks: ["The Lord of the Rings"]
      },
    ],
  

  userslogin: [
    {
      username: "harrypotter",
      email: "harry@example.com",
      password: "1234",
      active: true,
      borrowedBooks: ["To Kill a Mockingbird", "Game of Thrones"]
    },
    {
      username: "hermionegranger",
      email: "hermione@example.com",
      password: "5678",
      active: true,
      borrowedBooks: ["Pride and Prejudice", "Yellowface", "Jane Eyre", "Wuthering Heights"]
    },
  ],

  overdueBooks: [
    { id: 5, title: "Pride and Prejudice", borrower: "Hermione Granger", dueDate: "2025-03-14" },
    { id: 10, title: "The Lord of the Rings", borrower: "Luna Lovegood", dueDate: "2025-03-16" }
  ],

  currentlyBorrowed: {
    "Harry Potter": [
      { id: 2, title: "To Kill a Mockingbird", dueDate: "2025-03-01" },
      { id: 7, title: "Game of Thrones", dueDate: "2025-03-02" }
    ],
    "Hermione Granger": [
      { id: 5, title: "Pride and Prejudice", dueDate: "2025-03-14" }
    ],
    "Draco Malfoy": [
      { id: 8, title: "War and Peace", dueDate: "2025-03-02" }
    ],
    "Luna Lovegood": [
      { id: 10, title: "The Lord of the Rings", dueDate: "2025-03-16" }
    ]
  },
};

// Exporting the data for use in other JS files
module.exports = libraryData;
