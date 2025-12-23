import React, { useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import jobsData from '../data/jobs3D.json';
import styles from './JobDetails.module.css';

const JobDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // Find the job by ID from the JSON data
    // Convert id to number because URL params are always strings
    const job = useMemo(() => {
        return jobsData.find(j => j.ID === parseInt(id));
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
                    <h1 className={styles.jobTitle}>{job.Job_Title}</h1>
                    <div className={styles.jobMeta}>
                        <div className={styles.metaItem}>
                            <span className="material-symbols-outlined icon">domain</span>
                            {job.Studio}
                        </div>
                        <div className={styles.metaItem}>
                            <span className="material-symbols-outlined icon">location_on</span>
                            {job.City ? `${job.City}, ${job.Country}` : job.Country}
                        </div>
                        <div className={styles.metaItem}>
                            <span className="material-symbols-outlined icon">schedule</span>
                            {job.On_Site_Remote_Hybrid}
                        </div>
                        <div className={styles.metaItem}>
                            <span className="material-symbols-outlined icon">work_history</span>
                            {job.Experience_Level}
                        </div>
                    </div>

                    <div className={styles.applyActions}>
                        <a
                            href={job.Source_Contact}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.applyButton}
                        >
                            Aplicar a esta oferta
                        </a>
                        <p className={styles.applyNote}>Serás redirigido al sitio oficial.</p>
                    </div>
                </header>

                {/* Body with Description */}
                <div className={styles.jobDetailsBody}>
                    <h3 className={styles.sectionTitle}>Notas / Descripción</h3>
                    <p className={styles.description}>{job.Notes || 'No hay descripción adicional disponible.'}</p>

                    <h3 className={styles.sectionTitle}>Software</h3>
                    <div className={styles.tags}>
                        {job.Software_Programs ? (
                            job.Software_Programs.split(',').map((soft, index) => (
                                <span key={index} className={styles.tag}>{soft.trim()}</span>
                            ))
                        ) : (
                            <span className={styles.tag}>No especificado</span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobDetails;
