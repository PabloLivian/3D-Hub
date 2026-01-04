import { useState } from 'react';
import { supabase } from '../services/supabaseClient';
import styles from './CompleteProfile.module.css';

const CompleteProfile = ({ user, onComplete }) => {
    const [loading, setLoading] = useState(false);

    const handleRoleSelect = async (role) => {
        setLoading(true);
        try {
            // 1. Update user metadata for future sessions
            const { error: authError } = await supabase.auth.updateUser({
                data: { role: role }
            });

            if (authError) throw authError;

            // 2. Update/Insert into profiles table (trigger might have missed it or we need to be explicit)
            const { error: dbError } = await supabase
                .from('profiles')
                .upsert({
                    id: user.id,
                    email: user.email,
                    role: role,
                    full_name: user.user_metadata.full_name || '',
                    avatar_url: user.user_metadata.avatar_url || ''
                }, { onConflict: 'id' });

            if (dbError) throw dbError;

            // Reload page to refresh auth state fully
            window.location.reload();
        } catch (error) {
            console.error('Error updating role:', error);
            setLoading(false);
        }
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.card}>
                <h2 className={styles.title}>¡Casi listo!</h2>
                <p className={styles.description}>
                    Para personalizar tu experiencia en 3D Hub, necesitamos saber cómo planeas usar la plataforma.
                </p>

                <div className={styles.options}>
                    <button
                        className={styles.roleBtn}
                        onClick={() => handleRoleSelect('artist')}
                        disabled={loading}
                    >
                        <span className={styles.icon}>🎨</span> Soy Artista
                    </button>
                    <button
                        className={styles.roleBtn}
                        onClick={() => handleRoleSelect('company')}
                        disabled={loading}
                    >
                        <span className={styles.icon}>🏢</span> Soy Empresa
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CompleteProfile;
