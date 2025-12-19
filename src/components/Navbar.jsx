import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    return (
        <header className="navbar">
            <div className="container">
                <div className="navbar-content">
                    <Link to="/" className="navbar-logo">
                        <svg className="logo-icon" fill="none" stroke="currentColor" strokeLinecap="round"
                            strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg">
                            <polyline points="16 18 22 12 16 6"></polyline>
                            <polyline points="8 6 2 12 8 18"></polyline>
                        </svg>
                        <h2 className="logo-text">DevJobs</h2>
                    </Link>

                    <nav className="navbar-links">
                        <Link to="/search" className="nav-link">Buscar</Link>
                        <Link to="/jobs" className="nav-link">Empleos</Link>
                        <Link to="/companies" className="nav-link">Empresas</Link>
                        <Link to="/salaries" className="nav-link">Salarios</Link>
                    </nav>

                    <div className="navbar-actions">
                        <Link to="/post-job" className="btn btn-secondary">Publicar un empleo</Link>
                        <Link to="/login" className="btn btn-outline">Iniciar sesión</Link>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
