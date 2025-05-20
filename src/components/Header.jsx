import React from 'react'; 
import '../styles/header.css';
import logo from '../assets/logo2.png';
import { Link } from 'react-router-dom';


const Header = () => {
    return (
    <header className="header">
        <Link to="/">
    <img src={logo} alt="ComicVerse Logo" className="logo" />
    </Link>
    </header>
    );
};

export default Header;