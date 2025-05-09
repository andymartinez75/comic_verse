import React from 'react'; 
import '../styles/header.css';
import logo from '../assets/logo2.png';

const Header = () => {
    return (
    <header className="header">
        
    <img src={logo} alt="ComicVerse Logo" className="logo" />
    
    </header>
    );
};

export default Header;