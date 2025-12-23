import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className="container">
                <div className={styles.footerContent}>
                    <p className={styles.footerText}>© 2025 3D HUB. Todos los derechos reservados.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
