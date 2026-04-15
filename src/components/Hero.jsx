import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styles from './Hero.module.css';

const Hero = () => {
    const navigate = useNavigate();

    return (
        <section className={styles.hero}>
            <div className={styles.heroBackground}>
                <div className={styles.glowPrimary}></div>
                <div className={styles.glowSecondary}></div>
                <img
                    className={styles.heroImage}
                    alt="Abstract 3D rendered geometric shapes with metallic textures and neon blue lighting"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuClpxYJ3kwQfbBT_NQo742aSnsXfOJftS8iCYiko46-xS-PC6ekxMhT-vxOgfDIdn--lbI54rHwFW8JoF9wBLDADG79KGOTU-Nt9AZzWF4kD24by49jbFkveJEMKxPF4SiSadc8t4afUA7JZi5lI6zFYb8DxQ4p-VpHvn5KzeAsR4Z85NdVgSJcJ2H2ZY0-xdWSt9yJnD56ZYBrSBvr2C7V8CUhnQmxG05bfMHT3vDMWagSHeet46XGKdtwfi9L6O1tQJOMMU14w3pu"
                />
            </div>

            <div className={styles.heroContent}>
                <h1 className={styles.heroTitle}>
                    ¿Qué es <span className={styles.gradientText}>3D HUB?</span>
                </h1>
                <p className={styles.heroSubtitle}>
                    Es una plataforma donde los artistas pueden conectarse y ver todos los trabajos disponibles en la industria y las empresas tengan un acceso facil y ordenado para facilitar el siguimiento de los artistas.
                </p>

                <div className={styles.buttonGroup}>
                    <button
                        className={styles.primaryButton}
                        onClick={() => navigate('/jobs')}
                    >
                        Explorar Oportunidades
                        <span className="material-symbols-outlined">north_east</span>
                    </button>
                    <Link to="/artists" className={styles.secondaryButton}>
                        Ver Artistas
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Hero;
