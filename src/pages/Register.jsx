import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate, Link } from 'react-router-dom';
import styles from './Register.module.css';

const Register = () => {
    const [role, setRole] = useState('artist'); // 'artist' | 'company'
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [msg, setMsg] = useState('');
    const [loading, setLoading] = useState(false);

    const { signUp, loginWithGoogle } = useAuth();
    // eslint-disable-next-line no-unused-vars
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMsg('');
        setLoading(true);

        const { error } = await signUp(email, password, { role });

        if (error) {
            setError(error.message);
            setLoading(false);
        } else {
            setMsg('¡Registro exitoso! Por favor verifica tu correo para confirmar la cuenta.');
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        // Note: Google login might not capture 'role' unless we handle it via a pre-step or prompt after login.
        // For now, we will assume generic user or handle profile completion later.
        setError('');
        const { error } = await loginWithGoogle();
        if (error) setError(error.message);
    };

    return (
        <div className="page-wrapper">
            <div className={styles.container}>
                <div className={styles.card}>
                    <h2>Crear Cuenta</h2>

                    {error && <p className={styles.error}>{error}</p>}
                    {msg && <p className={styles.success}>{msg}</p>}

                    <form onSubmit={handleSubmit} className={styles.form}>

                        <div className={styles.roleSelector}>
                            <label className={styles.roleLabel}>¿Cómo quieres registrarte?</label>
                            <div className={styles.roleOptions}>
                                <button
                                    type="button"
                                    className={`${styles.roleBtn} ${role === 'artist' ? styles.active : ''}`}
                                    onClick={() => setRole('artist')}
                                >
                                    Artista
                                </button>
                                <button
                                    type="button"
                                    className={`${styles.roleBtn} ${role === 'company' ? styles.active : ''}`}
                                    onClick={() => setRole('company')}
                                >
                                    Empresa
                                </button>
                            </div>
                        </div>

                        <div className={styles.inputGroup}>
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <label htmlFor="password">Contraseña</label>
                            <input
                                type="password"
                                id="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                minLength={6}
                            />
                        </div>

                        <button type="submit" disabled={loading} className={styles.button}>
                            {loading ? 'Procesando...' : 'Registrarse'}
                        </button>
                    </form>

                    <div className={styles.divider}>
                        <span>O</span>
                    </div>

                    <button onClick={handleGoogleLogin} className={styles.googleButton}>
                        <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                        </svg>
                        Continuar con Google
                    </button>

                    <p className={styles.footerText}>
                        ¿Ya tienes cuenta? <Link to="/login">Inicia Sesión aquí</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
