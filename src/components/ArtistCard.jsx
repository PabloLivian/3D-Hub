
import React from 'react';
import styles from './ArtistCard.module.css';

const ArtistCard = ({ artist }) => {
    const {
        Nombre,
        Rol,
        Ubicacion,
        Ciudad,
        Experiencia,
        Software,
        Disponibilidad,
        Reel,
        LinkedIn,
        Relocalizacion,
        Industrias
    } = artist;

    // Helper: Clean availability string and check status
    const isAvailable = Disponibilidad && Disponibilidad.toLowerCase().includes('available');
    const availabilityClass = isAvailable ? styles.available : styles.unavailable;

    // Helper: Parse software string to array
    const softwareList = Software ? Software.split(',').map(s => s.trim()).filter(s => s) : [];

    // Helper: Validate LinkedIn URL
    const isValidLinkedInUrl = LinkedIn && (LinkedIn.startsWith('http') || LinkedIn.startsWith('www'));

    return (
        <article className={styles.artistCard}>
            <div className={styles.info}>
                <div className={styles.header}>
                    <div className={styles.nameRoleWrapper}>
                        <div className={styles.topRow}>
                            <h3 className={styles.name}>{Nombre}</h3>
                            <div className={styles.badgesWrapper}>
                                <span className={`${styles.availability} ${availabilityClass}`}>
                                    {Disponibilidad || 'Consultar'}
                                </span>
                                {isValidLinkedInUrl ? (
                                    <a href={LinkedIn} target="_blank" rel="noopener noreferrer" className={styles.linkedin} title="LinkedIn Profile">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                        </svg>
                                    </a>
                                ) : (
                                    <span className={styles.linkedinMuted} title="No LinkedIn">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                        </svg>
                                    </span>
                                )}
                            </div>
                        </div>
                        <span className={styles.role}>{Rol}</span>
                    </div>
                </div>

                <div className={styles.meta}>
                    <div className={styles.metaItem}>
                        <svg className={styles.icon} viewBox="0 0 24 24" fill="currentColor" height="20" width="20">
                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                        </svg>
                        {Ciudad}, {Ubicacion}
                    </div>
                    {Experiencia && (
                        <div className={styles.metaItem}>
                            <svg className={styles.icon} viewBox="0 0 24 24" fill="currentColor" height="20" width="20">
                                <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
                            </svg>
                            {Experiencia} {isNaN(Number(Experiencia)) ? '' : 'años exp.'}
                        </div>
                    )}
                    <div className={styles.metaItem}>
                        <svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="-1 -1 24 24">
                            <title>plane-f</title>
                            <path fill="currentColor" d="m12.685 13.285l-3.44 3.06l.528 2.423l-2.488 2.488l-2.507-3.921l-3.921-2.507l2.488-2.488L5.9 13l2.927-3.573l-6.171-4.114l2.828-2.829L13.2 5.057l3.793-3.793c1.171-1.172 2.985-1.258 4.05-.193s.978 2.878-.193 4.05l-3.793 3.793l2.571 7.713l-2.828 2.829z" />
                        </svg>
                        Relocalizacion: {Relocalizacion}
                    </div>
                </div>

                {softwareList.length > 0 && (
                    <div className={styles.softwareChips}>
                        {softwareList.map((sw, index) => (
                            <span key={index} className={styles.chip}>{sw}</span>
                        ))}
                    </div>
                )}
            </div>

            <div className={styles.actions}>
                <a href={`mailto:contact@3dhub.com?subject=Interés en ${Nombre}`} className={styles.contactButton}>
                    Contactar
                </a>
                {Reel ? (
                    <a href={Reel} target="_blank" rel="noopener noreferrer" className={styles.reelButton}>
                        Ver Reel
                    </a>
                ) : (
                    <button className={`${styles.reelButton} ${styles.reelButtonMuted}`} disabled>
                        No Reel
                    </button>
                )}
            </div>
        </article>
    );
};

export default ArtistCard;
