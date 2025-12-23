import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../pages/Companies.module.css'; // Utilizing the same module for simplicity or could be separate

const CompanyCard = ({ name, count, logo }) => {
    return (
        <Link to={`/jobs?q=${encodeURIComponent(name)}`} className={styles.companyCardLink}>
            <div className={styles.companyCard}>
                <div className={styles.logoContainer}>
                    {logo ? (
                        <img src={logo} alt={`${name} logo`} className={styles.companyLogo} />
                    ) : (
                        <span className={styles.logoPlaceholder}>{name.charAt(0)}</span>
                    )}
                </div>
                <h3 className={styles.companyName}>{name}</h3>
                <p className={styles.jobCount}>
                    {count} {count === 1 ? 'oferta disponible' : 'ofertas disponibles'}
                </p>
            </div>
        </Link>
    );
};

export default CompanyCard;
