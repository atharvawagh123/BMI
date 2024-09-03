import React from 'react';
import { Route, Routes, } from 'react-router-dom';
import Nav from './Nav';
import Main from './Main';
import Footer from './Footer';
import Blog from './Blog';
import Register from './Register';
import Suggestion from './Suggestion';

const App = () => {
    return (
        <>
            
            <Nav />
            <Routes >
                <Route path="/" element={<Main />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/suggestion" element={<Suggestion />} />
                <Route path="/register" element={<Register />} />
            </Routes>
            <Footer />
           
        </>
    );
};

export default App;
