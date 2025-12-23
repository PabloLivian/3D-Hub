import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './JobCard.module.css';

const JobCard = ({ id, title, company, location, description, modality, experience, externalLink, className }) => {

    // We don't really need state for "Applied" anymore if it's an external link, 
    // but maybe we want to visually indicate it was clicked? 
    // User asked to "change functionality", implying it's now just a link.
    // Let's rely on :visited if needed, or simple link behavior.

    return (
        <div className={`${styles.jobCard} ${className || ''}`}>
            <div className={styles.jobCardContent}>
                <Link to={`/jobs/${id}`} className={styles.cardLink}>
                    <div className={styles.jobInfo}>
                        <div className={styles.jobHeader}>
                            <h3 className={styles.jobTitle}>{title}</h3>
                            <span className={styles.jobExperience}>{experience}</span>
                        </div>
                        <p className={styles.jobCompany}>{company}</p>
                        <div className={styles.jobDetailsRow}>
                            <p className={styles.jobLocation}>{location}</p>
                            <span className={styles.jobModality}>{modality}</span>
                        </div>
                        <p className={styles.jobDescription}>{description || 'Sin descripción previa'}</p>
                    </div>
                </Link>
                <div className={styles.jobAction}>
                    <a
                        href={externalLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.btnApply}
                        onClick={(e) => e.stopPropagation()}
                    >
                        Aplicar
                    </a>
                </div>
            </div>
        </div>
    );
};

export default JobCard;
