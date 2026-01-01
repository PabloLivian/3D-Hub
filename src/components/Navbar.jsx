import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Navbar.module.css';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    // Refs for click-outside detection
    const menuRef = useRef(null);
    const buttonRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else if (window.scrollY < 10) {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Click outside handler
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                isMenuOpen &&
                menuRef.current &&
                !menuRef.current.contains(event.target) &&
                buttonRef.current &&
                !buttonRef.current.contains(event.target)
            ) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isMenuOpen]);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    const isActive = (path) => {
        return location.pathname === path ? `${styles.navLink} ${styles.active}` : styles.navLink;
    };

    return (
        <header className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}>
            <div className="container">
                <div className={styles.navbarContent}>
                    <Link to="/" className={styles.navbarLogo}>
                        <svg className={styles.logoIcon} width="200px" height="200px" viewBox="0 0 200 200" version="1.1" xmlns="http://www.w3.org/2000/svg">
                            <title>Cubo Minimalista 3D</title>
                            <desc>Un cubo isométrico con sombreado plano.</desc>
                            <g id="cubo" transform="translate(100, 100)">
                                <polygon id="top-face" fill="#A0C4FF" points="0,-50 50,-25 0,0 -50,-25"></polygon>
                                <polygon id="left-face" fill="#74A5F7" points="0,0 -50,-25 -50,25 0,50"></polygon>
                                <polygon id="right-face" fill="#4A86E8" points="0,0 50,-25 50,25 0,50"></polygon>
                            </g>
                        </svg>
                        <h2 className={styles.logoText}>3D HUB</h2>
                    </Link>

                    <nav className={styles.navbarLinks}>
                        <Link to="/jobs" className={isActive('/jobs')}>Empleos</Link>
                        <Link to="/companies" className={isActive('/companies')}>Empresas</Link>
                        <Link to="/artists" className={isActive('/artists')}>Talento</Link>
                        <Link to="/contact" className={isActive('/contact')}>Contacto</Link>
                    </nav>

                    {/* Hamburger Button */}
                    <button
                        ref={buttonRef}
                        className={`${styles.menuToggle} ${isMenuOpen ? styles.open : ''}`}
                        onClick={toggleMenu}
                        aria-label="Toggle navigation"
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>

                    <div className={styles.navbarActions}>
                        <div className={styles.desktopThemeToggle}>
                            <ThemeToggle />
                        </div>
                        {/* Post Job button removed as per request */}
                        <Link to="/register" className={styles.registerLink}>Registrarse</Link>
                        <Link to="/login" className={`${styles.btn} ${styles.btnOutline}`}>Iniciar sesión</Link>
                    </div>
                </div>

                {/* Mobile Menu Dropdown */}
                <div
                    ref={menuRef}
                    className={`${styles.mobileMenu} ${isMenuOpen ? styles.open : ''}`}
                >
                    <Link to="/jobs" className={isActive('/jobs')} onClick={closeMenu}>Empleos</Link>
                    <Link to="/companies" className={isActive('/companies')} onClick={closeMenu}>Empresas</Link>
                    <Link to="/artists" className={isActive('/artists')} onClick={closeMenu}>Talento</Link>
                    <Link to="/contact" className={isActive('/contact')} onClick={closeMenu}>Contacto</Link>
                    <div style={{ padding: '1rem' }}>
                        <ThemeToggle />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
