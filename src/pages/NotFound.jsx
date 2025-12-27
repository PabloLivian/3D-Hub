import { Link } from 'react-router-dom';
import styles from './NotFound.module.css';

const NotFound = () => {
    return (
        <div className="page-wrapper">
            <div className={styles.container}>
                <h1 className={styles.errorCode}>404</h1>
                <h2 className={styles.title}>¡Ups! Página no encontrada</h2>
                <p className={styles.message}>
                    Parece que te has perdido en el ciberespacio. La página que buscas no existe o ha sido movida.
                </p>
                <Link to="/" className={styles.homeLink}>
                    <span className="material-symbols-outlined">home</span>
                    Volver al Inicio
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
