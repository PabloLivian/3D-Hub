import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar = () => {
    return (
        <header className={styles.navbar}>
            <div className="container">
                <div className={styles.navbarContent}>
                    <Link to="/" className={styles.navbarLogo}>
                        <svg className={styles.logoIcon} fill="none" stroke="currentColor" strokeLinecap="round"
                            strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg">
                            <polyline points="16 18 22 12 16 6"></polyline>
                            <polyline points="8 6 2 12 8 18"></polyline>
                        </svg>
                        <h2 className={styles.logoText}>DevJobs</h2>
                    </Link>

                    <nav className={styles.navbarLinks}>
                        <Link to="/search" className={styles.navLink}>Buscar</Link>
                        <Link to="/jobs" className={styles.navLink}>Empleos</Link>
                        <Link to="/companies" className={styles.navLink}>Empresas</Link>
                        <Link to="/salaries" className={styles.navLink}>Salarios</Link>
                    </nav>

                    <div className={styles.navbarActions}>
                        <Link to="/post-job" className={`${styles.btn} ${styles.btnSecondary}`}>Publicar un empleo</Link>
                        <Link to="/login" className={`${styles.btn} ${styles.btnOutline}`}>Iniciar sesión</Link>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
