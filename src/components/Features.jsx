import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Features.module.css';
import jobsData from '../data/jobs3D.json';
import tablaJoseImg from '../assets/TablaJose.png';

const Features = () => {
    // Get the first 6 jobs for the "Recent Job Postings" section
    const recentJobs = jobsData.slice(0, 6);

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
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuD3WtGUX9_69FJ-k--23-Br4fsd3WDkou1U4GP0G8ZTszedY0KkCxr-PV8vI3pqXWi8o5Nc59Y8D-r25RRqLJPzCxWWvyIByMn8bpcnbmRpGcvRsdHiCR__X_5EtA1f5ExU3JmFKZTM64XnIZHVR2gTvH26pifIdMHgXoM0k8ipmge3SPvo3xxzrtuWLdtcC6rV-DV0uMA5PZF5NCIhEqw5CnhoiPPpFv5Y4a5DKbpAcDuKepbBUUC3omXdsRb5De6ONoue4J2yP0Ng" 
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
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBTjerBfDWhRXc5y8g-cbatQKByAneVMaimUoLFDdBrzyEjno0RLzOk7RUHg3gZO4gs9KhrdfbXaFy-2a4VImofBfdWCFqV7YhvzQpYlW5RLTMsWlGTxH_ts89VwOX09A0TrpvfonJ62ZN5ZyjiqMG5dB2MYXmBDCc94zF0Tkvm_GPotIA2EP8FaQnZ7SYirWqZUWUkWWdsNQLR4R59AG9o4LYJfLuoUMYo8Mw0JQ064z_DE19FvMxT1mLYyPE6QbA10VCPQDuYlClu" 
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
                        <span className={styles.pulseDot}></span>
                        <span className={styles.statsText}><strong>+24 artistas</strong> se han unido esta semana</span>
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
                        {recentJobs.map((job) => {
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
                                            <p className={styles.jobTime}>Nuevo</p>
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
                                <div className={styles.creatorSignoff}>
                                    <div className={styles.creatorLine}></div>
                                    <span className={styles.creatorName}>Colaboración con la Comunidad</span>
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
