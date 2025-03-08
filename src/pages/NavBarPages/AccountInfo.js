import React, { useState } from "react";
import "./AccountInfo.css";

const AccountInfo = () => {
    const [bookTitle, setBookTitle] = useState("");
    const [bookAuthor, setBookAuthor] = useState("");
    const [requestStatus, setRequestStatus] = useState("");
  
    const handleRequestSubmit = () => {
      if (bookTitle.trim() && bookAuthor.trim()) {
        setRequestStatus("Request Approved!");
        setBookTitle("");
        setBookAuthor("");
      } else {
        setRequestStatus("Please enter both title and author.");
      }
    };
  
    return (
      <div className="borrowbook-info-container629">
        <h1 className="title629">Didn't find the book you wanted?</h1>
  
        <p className="description629">
          We're working on it! Simply request the book you need, and we'll add it to our catalog as soon as possible.
        </p>

        <div className="request-form629">
          <input
            type="text"
            placeholder="Enter Book Title"
            value={bookTitle}
            onChange={(e) => setBookTitle(e.target.value)}
            className="input-field629"
          />
          <input
            type="text"
            placeholder="Enter Author Name"
            value={bookAuthor}
            onChange={(e) => setBookAuthor(e.target.value)}
            className="input-field629"
          />
          <button onClick={handleRequestSubmit} className="request-button629">
            Send Request
          </button>
          {requestStatus && <p className="request-status629">{requestStatus}</p>}
        </div>

           {/* Image Section */}
      <div className="image-container629">
        <img
          src="/pulpfiction.png"
          alt="Paul Rudd reading in Clueless"
          className="borrowbook-image629"
        />
        <p className="image-caption629">
          John Travolta as Vincet Vega reading Modesty Blaise in <i>Pulp Ficton</i>.
        </p>
      </div>
      
  
          <a href="/HomePage" className="home-button629">
            Return to Home Page
          </a>
        </div>
    );
};

export default AccountInfo;
