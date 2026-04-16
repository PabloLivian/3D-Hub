import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Features.module.css';
import jobsData from '../data/jobs3D.json';
import tablaJoseImg from '../assets/TablaJose.png';
import artistImg from '../assets/Artist.png';
import estudioImg from '../assets/Estudio.png';

const Features = () => {
    // Get the first 6 jobs and assign sorted "days ago" values for ordering
    const daysSequence = [1, 2, 3, 3, 4, 5];
    const recentJobs = jobsData.slice(0, 6).map((job, index) => ({
        ...job,
        daysAgo: daysSequence[index]
    }));

    return (
        <>
            {/* Section 2: Split Perspective (Artists vs Companies) */}
            <section className={styles.section}>
                <div className={styles.container}>
                    <div className={styles.splitGrid}>
                        {/* Artists Side */}
                        <div className={styles.splitCard}>
                            <div className={styles.cardIconBg}>
                                <span className={`material-symbols-outlined ${styles.bgIcon}`}>brush</span>
                            </div>
                            <div className={styles.cardContent}>
                                <h3>Para Artistas</h3>
                                <p>Escala tu carrera creativa. Encuentra oportunidades globales que encajen con tu stack técnico y estilo estético.</p>
                                <Link to="/jobs" className={styles.cardLink}>
                                    Encuentra tu próximo rol 
                                    <span className="material-symbols-outlined">arrow_forward</span>
                                </Link>
                            </div>
                            <div className={styles.cardImageBg}>
                                <img 
                                    alt="Close up of a 3D character design workspace" 
                                    src={artistImg} 
                                />
                            </div>
                        </div>

                        {/* Companies Side */}
                        <div className={styles.splitCard}>
                            <div className={styles.cardIconBgLeft}>
                                <span className={`material-symbols-outlined ${styles.bgIconTertiary}`}>apartment</span>
                            </div>
                            <div className={styles.cardContent}>
                                <h3>Para Empresas</h3>
                                <p>Asegura el mejor talento 3D de la industria. Accede a un grupo seleccionado de artistas listos para tu próxima producción.</p>
                                <Link to="/artists" className={styles.cardLink}>
                                    Busca a los mejores 
                                    <span className="material-symbols-outlined">arrow_forward</span>
                                </Link>
                            </div>
                            <div className={styles.cardImageBg}>
                                <img 
                                    alt="High tech studio environment" 
                                    src={estudioImg} 
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 3: Recent Job Postings */}
            <section className={styles.section}>
                <div className={styles.container}>
                    <div className={styles.statsBadge}>
                        <div className={styles.statsMain}>
                            <span className={styles.pulseDot}></span>
                            <span className={styles.statsText}><strong>+24 artistas</strong> se han unido esta semana</span>
                        </div>
                        <Link to="/join" className={styles.statsButton}>
                            Join to the list
                            <span className="material-symbols-outlined">person_add</span>
                        </Link>
                    </div>

                    <div className={styles.jobsHeader}>
                        <div>
                            <h2>Ofertas de Empleo Recientes</h2>
                            <p>Las últimas oportunidades en el ecosistema 3D.</p>
                        </div>
                        <Link to="/jobs" className={styles.seeAllLink}>
                            Ver Todas <span className="material-symbols-outlined">list</span>
                        </Link>
                    </div>

                    <div className={styles.jobsList}>
                        {recentJobs.map((job, index) => {
                            // Extract two tags (e.g., from Software_Programs)
                            const softwareList = job.Software_Programs ? job.Software_Programs.split(',').map(s => s.trim()).filter(Boolean) : [];
                            const tags = softwareList.slice(0, 2);

                            return (
                                <Link to={`/jobs/${job.ID}`} key={job.ID} className={styles.jobItem}>
                                    <div className={styles.jobInfoLeft}>
                                        <div className={styles.jobIconBox}>
                                            <span className="material-symbols-outlined w-14">view_in_ar</span>
                                        </div>
                                        <div className={styles.jobMainInfo}>
                                            <h4>{job.Job_Title}</h4>
                                            <p>{job.Studio} • {job.City ? `${job.City}, ${job.Country}` : job.Country}</p>
                                        </div>
                                    </div>
                                    <div className={styles.jobInfoRight}>
                                        <div className={styles.jobMeta}>
                                            <p className={styles.jobTime}>{job.daysAgo === 1 ? 'Hoy' : `Hace ${job.daysAgo} días`}</p>
                                            <p className={styles.jobType}>{job.On_Site_Remote_Hybrid}</p>
                                        </div>
                                        <span className={`material-symbols-outlined ${styles.chevronIcon}`}>chevron_right</span>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Section 4: Data Credits / Tracking Table */}
            <section className={styles.creatorSection}>
                <div className={styles.container}>
                    <div className={styles.creatorPanel}>
                        <div className={styles.creatorGrid}>
                            <div className={styles.creatorImageContainer}>
                                <div className={styles.creatorGlow}></div>
                                <img 
                                    className={styles.creatorImage} 
                                    alt="Creative Industries Job Offers Tracking" 
                                    src={tablaJoseImg} 
                                />
                            </div>
                            <div className={styles.creatorText}>
                                <h2>Basado en las tablas dinámicas de Jose A Rodriguez y el excel de Chris Mayne.</h2>
                                <p>
                                    Este proyecto es posible gracias a la recopilación y procesamiento de datos de ofertas de trabajo publicados por Chris Mayne en su comunidad. La visualización y estructura se apoyan en el trabajo continuo de seguimiento de la industria de animación, VFX y videojuegos.
                                </p>
                                <div className={styles.sourceLinks}>
                                    <div className={styles.sourceGroup}>
                                        <span className={styles.sourceLabel}>Jose A Rodriguez:</span>
                                        <a href="https://datastudio.google.com/u/0/reporting/cd435dc3-d801-4193-a661-4e8d5b35eb63/page/8H7FE?s=gm4JDvfNaEE" target="_blank" rel="noopener noreferrer">Trabajos</a>
                                        <span className={styles.separator}>•</span>
                                        <a href="https://datastudio.google.com/u/0/reporting/b47c108d-ec5f-4302-8455-6d6b4a076481?s=q9TmLdHY96c" target="_blank" rel="noopener noreferrer">Artistas</a>
                                    </div>
                                    <div className={styles.sourceGroup}>
                                        <span className={styles.sourceLabel}>Chris Mayne:</span>
                                        <a href="https://docs.google.com/spreadsheets/d/1eR2oAXOuflr8CZeGoz3JTrsgNj3KuefbdXJOmNtjEVM/edit?gid=0#gid=0" target="_blank" rel="noopener noreferrer">Trabajos</a>
                                        <span className={styles.separator}>•</span>
                                        <a href="https://docs.google.com/spreadsheets/d/1q_dlWZvGN8Gts_yCezeO0vq8GYfjpFpaFbSrfObQF2k/edit?gid=0#gid=0" target="_blank" rel="noopener noreferrer">Artistas</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Features;
