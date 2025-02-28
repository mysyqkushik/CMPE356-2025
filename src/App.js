import React from 'react';
import HomePage from "./pages/HomePage"; 

const App = () => {
    return (
        <div>
            <HomePage />

            <footer style={{ background: '#282c34', padding: '10px', color: 'white', textAlign: 'center' }}>
                <p>© 2025 The Book Owl. Library Management System</p>
            </footer>
        </div>
    );
};

export default App;
