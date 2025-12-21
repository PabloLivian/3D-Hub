import React, { useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import jobsData from '../data/jobs.json';
import styles from './JobDetails.module.css';

const JobDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // Find the job by ID from the JSON data
    // Convert id to number because URL params are always strings
    const job = useMemo(() => {
        return jobsData.find(j => j.id === parseInt(id));
    }, [id]);

    if (!job) {
        return (
            <div className={styles.jobDetailsPage}>
                <div className="container">
                    <div className={styles.notFound}>
                        <h2 className={styles.notFoundTitle}>Oferta no encontrada</h2>
                        <Link to="/jobs" className={styles.backLink}>Volver a las ofertas</Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.jobDetailsPage}>
            <div className="container">
                <Link to="/jobs" className={styles.backLink}>
                    <span className="material-symbols-outlined">arrow_back</span>
                    Volver a las ofertas
                </Link>

                {/* Header with Title and Metadata */}
                <header className={styles.jobDetailsHeader}>
                    <h1 className={styles.jobTitle}>{job.title}</h1>
                    <div className={styles.jobMeta}>
                        <div className={styles.metaItem}>
                            <span className="material-symbols-outlined icon">domain</span>
                            {job.company}
                        </div>
                        <div className={styles.metaItem}>
                            <span className="material-symbols-outlined icon">location_on</span>
                            {job.location}
                        </div>
                        <div className={styles.metaItem}>
                            <span className="material-symbols-outlined icon">schedule</span>
                            {job.contract}
                        </div>
                        <div className={styles.metaItem}>
                            <span className="material-symbols-outlined icon">work_history</span>
                            {job.experience}
                        </div>
                    </div>

                    <button className={styles.applyButton} onClick={() => alert('¡Aplicación enviada con éxito!')}>
                        Aplicar a esta oferta
                    </button>
                </header>

                {/* Body with Description */}
                <div className={styles.jobDetailsBody}>
                    <h3 className={styles.sectionTitle}>Descripción del puesto</h3>
                    <p className={styles.description}>{job.description}</p>

                    <h3 className={styles.sectionTitle}>Categoría</h3>
                    <div className={styles.tags}>
                        <span className={styles.tag}>{job.category}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobDetails;
