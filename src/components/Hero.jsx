import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Hero.module.css';

const Hero = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        const trimmedTerm = searchTerm.trim();
        if (trimmedTerm) {
            navigate(`/jobs?q=${encodeURIComponent(trimmedTerm)}`);
        } else {
            navigate('/jobs');
        }
    };

    return (
        <section className={styles.hero}>
            <div className={`container ${styles.heroContainer}`}>
                <h1 className={styles.heroTitle}>Encuentra el estudio donde dejarás tu huella digital</h1>
                <p className={styles.heroSubtitle}>
                    Únete a la comunidad emergente de la industria de 3D y encuentra tu próxima oportunidad.
                </p>

                <div className={styles.searchFormContainer}>
                    <form className={styles.searchForm} onSubmit={handleSearch}>
                        <span className={styles.searchIcon}>
                            <svg fill="currentColor" height="24" viewBox="0 0 256 256" width="24"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z">
                                </path>
                            </svg>
                        </span>
                        <input
                            className={styles.searchInput}
                            placeholder="Buscar empleos por título, habilidad o empresa"
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button className={styles.searchButton} type="submit">Buscar</button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Hero;
