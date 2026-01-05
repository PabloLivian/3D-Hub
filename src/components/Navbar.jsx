import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Navbar.module.css';
import ThemeToggle from './ThemeToggle';
import { useAuth } from '../hooks/useAuth';
import UserAvatar from './UserAvatar';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();
    const { user, signOut } = useAuth();

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

    const handleLogout = async () => {
        await signOut();
        closeMenu();
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
                        {user ? (
                            <>
                                <button onClick={handleLogout} className={styles.textBtn}>
                                    <span className={styles.logoutText}>Cerrar sesión</span>
                                    <span className={styles.logoutIcon}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24">
                                            <title>Cerrar Sesión</title>
                                            <path fill="currentColor" d="m17 8l-1.41 1.41L17.17 11H9v2h8.17l-1.58 1.58L17 16l4-4zM5 5h7V3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h7v-2H5z" />
                                        </svg>
                                    </span>
                                </button>
                                <UserAvatar />
                            </>
                        ) : (
                            <>
                                <Link to="/register" className={styles.registerLink}>
                                    <span className={styles.registerText}>Registrarse</span>
                                    <span className={styles.registerIcon}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><title>Registrarse</title><path fill="currentColor" d="M15 14c-2.67 0-8 1.33-8 4v2h16v-2c0-2.67-5.33-4-8-4m-9-4V7H4v3H1v2h3v3h2v-3h3v-2m6 2a4 4 0 0 0 4-4a4 4 0 0 0-4-4a4 4 0 0 0-4 4a4 4 0 0 0 4 4" /></svg>
                                    </span>
                                </Link>
                                <Link to="/login" className={`${styles.btn} ${styles.btnOutline}`}>
                                    <span className={styles.loginText}>Iniciar sesión</span>
                                    <span className={styles.loginIcon}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24"><title>Iniciar sesión</title><path fill="currentColor" d="M11 7L9.6 8.4l2.6 2.6H2v2h10.2l-2.6 2.6L11 17l5-5zm9 12h-8v2h8c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-8v2h8z" /></svg>
                                    </span>
                                </Link>
                            </>
                        )}
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
                    {!user && (
                        <div className={styles.mobileAuthActions}>
                            <Link to="/login" className={styles.mobileAuthBtn} onClick={closeMenu}>Iniciar sesión</Link>
                            <Link to="/register" className={styles.mobileAuthBtn} onClick={closeMenu}>Registrarse</Link>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Navbar;
