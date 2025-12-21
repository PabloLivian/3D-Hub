import React, { useState } from 'react';
import styles from './JobCard.module.css';

const JobCard = ({ title, company, location, description, className }) => {
    const [isApplied, setIsApplied] = useState(false);

    const handleApply = () => {
        setIsApplied(true);
    };

    return (
        <div className={`${styles.jobCard} ${className || ''}`}>
            <div className={styles.jobCardContent}>
                <div className={styles.jobInfo}>
                    <h3 className={styles.jobTitle}>{title}</h3>
                    <p className={styles.jobMeta}>{company} | {location}</p>
                    <p className={styles.jobDescription}>{description}</p>
                </div>
                <div className={styles.jobAction}>
                    <button
                        className={`${styles.btnApply} ${isApplied ? styles.applied : ''}`}
                        onClick={handleApply}
                        disabled={isApplied}
                    >
                        {isApplied ? 'Aplicado' : 'Aplicar'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default JobCard;
