import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);

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
                        <Link to="/jobs" className={styles.navLink}>Empleos</Link>
                        <Link to="/companies" className={styles.navLink}>Empresas</Link>
                        <Link to="/artists" className={styles.navLink}>Talento</Link>
                        <Link to="/contact" className={styles.navLink}>Contacto</Link>
                    </nav>

                    <div className={styles.navbarActions}>
                        {/* Post Job button removed as per request */}
                        <Link to="/login" className={`${styles.btn} ${styles.btnOutline}`}>Iniciar sesión</Link>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
