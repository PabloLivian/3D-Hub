import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../pages/Companies.module.css';

const CompanyCard = ({ name, count, logo, website }) => {
    const navigate = useNavigate();

    const handleCardClick = (e) => {
        // Prevent navigation if the website link was clicked
        if (e.target.closest(`.${styles.websiteLink}`)) {
            return;
        }
        navigate(`/jobs?q=${encodeURIComponent(name)}`);
    };

    const simplifiedWebsite = website ? website.replace(/^https?:\/\//, '').replace(/\/$/, '') : '';

    return (
        <div onClick={handleCardClick} className={styles.companyCardLink} role="button" tabIndex={0}>
            <div className={styles.companyCard}>
                <div className={styles.logoContainer}>
                    {logo ? (
                        <img src={logo} alt={`${name} logo`} className={styles.companyLogo} />
                    ) : (
                        <span className={styles.logoPlaceholder}>{name.charAt(0)}</span>
                    )}
                </div>
                <h3 className={styles.companyName}>{name}</h3>

                {website && (
                    <a
                        href={website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.websiteLink}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" className={styles.websiteIcon}>
                            <title>link-out</title>
                            <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.5 10.5L21 3m-5 0h5v5m0 6v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5" />
                        </svg>
                        {simplifiedWebsite}
                    </a>
                )}

                <p className={styles.jobCount}>
                    {count} {count === 1 ? 'oferta disponible' : 'ofertas disponibles'}
                </p>
            </div>
        </div>
    );
};

export default CompanyCard;
