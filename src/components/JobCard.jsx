import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './JobCard.module.css';

const JobCard = ({ id, title, company, location, description, className }) => {
    const [isApplied, setIsApplied] = useState(false);

    const handleApply = (e) => {
        e.preventDefault(); // Prevent navigation to details when clicking apply
        e.stopPropagation();
        setIsApplied(true);
    };

    return (
        <div className={`${styles.jobCard} ${className || ''}`}>
            <div className={styles.jobCardContent}>
                <Link to={`/jobs/${id}`} className={styles.cardLink}>
                    <div className={styles.jobInfo}>
                        <h3 className={styles.jobTitle}>{title}</h3>
                        <p className={styles.jobMeta}>{company} | {location}</p>
                        <p className={styles.jobDescription}>{description}</p>
                    </div>
                </Link>
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
