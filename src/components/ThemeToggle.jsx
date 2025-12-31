import React from 'react';
import { useTheme } from '../context/ThemeContext';
import styles from './Navbar.module.css'; // Reusing Navbar styles for consistency

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className={styles.themeToggle}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
            <span className="material-symbols-outlined">
                {theme === 'dark' ? 'light_mode' : 'dark_mode'}
            </span>
        </button>
    );
};

export default ThemeToggle;
