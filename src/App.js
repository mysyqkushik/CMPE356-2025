import React from 'react';
import HomePage from "./pages/HomePage"; 

const App = () => {
    return (
        <div>
            <header style={{ background: '#282c34', padding: '20px', color: 'white' }}>
                <h1>My Simple act Website</h1>
            </header>

            <HomePage />

            <main style={{ padding: '20px' }}>
                <h2>Welcome to My Website</h2>
                <p>This is a simple React website built with functional components.</p>
            </main>

            <footer style={{ background: '#282c34', padding: '10px', color: 'white', textAlign: 'center' }}>
                <p>© 2025 My Simple React Website</p>
            </footer>
        </div>
    );
};

export default App;
