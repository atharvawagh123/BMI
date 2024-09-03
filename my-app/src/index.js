import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ToggleAppButton from './ToggleAppButton';
import Nav  from './Nav';
import Main from './Main';
import Footer from './Footer';
import Blog from './Blog';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Login from './Login';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Nav />
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/blog" element={<Blog />} />
      <Route path='/login' element={<Login/>}/>
    </Routes>
    <Footer/>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
