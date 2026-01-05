import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../services/supabaseClient';
import styles from './Profile.module.css';
import AvatarUploader from '../components/AvatarUploader';
import DynamicList from '../components/DynamicList';

const Profile = () => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState(null);

    const [formData, setFormData] = useState({
        full_name: '',
        avatar_url: '',
        job_title: '',
        country: '',
        city: '',
        availability: '',
        years_of_experience: '',
        relocation: '',
        work_preference: '',
        linkedin_url: '',
        portfolio_url: '',
        cv_url: '',
        industries: [],
        software: []
    });

    useEffect(() => {
        if (!user) return;
        getProfile();
    }, [user]);

    const getProfile = async () => {
        try {
            setLoading(true);

            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', user.id)
                .single();

            if (error) {
                console.warn(error);
            } else if (data) {
                setFormData({
                    full_name: data.full_name || '',
                    avatar_url: data.avatar_url || '',
                    job_title: data.job_title || data.role || '', // Fallback to system role if empty
                    country: data.country || '',
                    city: data.city || '',
                    availability: data.availability || '',
                    years_of_experience: data.years_of_experience || '',
                    relocation: data.relocation || '',
                    work_preference: data.work_preference || '',
                    linkedin_url: data.linkedin_url || '',
                    portfolio_url: data.portfolio_url || '',
                    cv_url: data.cv_url || '',
                    industries: data.industries || [],
                    software: data.software || []
                });
            }
        } catch (error) {
            console.error('Error loading profile:', error.message);
        } finally {
            setLoading(false);
        }
    };

    const updateProfile = async (e) => {
        e.preventDefault();
        try {
            setSaving(true);
            setMessage(null);

            const updates = {
                id: user.id,
                role: user.user_metadata?.role || 'user',
                full_name: formData.full_name,
                avatar_url: formData.avatar_url,
                job_title: formData.job_title,
                country: formData.country,
                city: formData.city,
                availability: formData.availability,
                years_of_experience: formData.years_of_experience ? parseInt(formData.years_of_experience) : null,
                relocation: formData.relocation,
                work_preference: formData.work_preference,
                linkedin_url: formData.linkedin_url,
                portfolio_url: formData.portfolio_url,
                // cv_url: formData.cv_url, // Not editable directly yet, needs file upload
                industries: formData.industries,
                software: formData.software,
                updated_at: new Date(),
            };

            const { error } = await supabase.from('profiles').upsert(updates);

            if (error) {
                throw error;
            }

            setMessage({ type: 'success', text: '¡Perfil actualizado correctamente!' });

            // Auto hide message
            setTimeout(() => setMessage(null), 3000);

        } catch (error) {
            setMessage({ type: 'error', text: 'Error al actualizar: ' + error.message });
        } finally {
            setSaving(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleAvatarUpload = async (publicUrl) => {
        // Update local state immediately to show new image
        setFormData(prev => ({ ...prev, avatar_url: publicUrl }));

        // Also update DB immediately for better UX
        const { error } = await supabase.from('profiles').upsert({
            id: user.id,
            avatar_url: publicUrl,
            updated_at: new Date()
        });

        if (!error) {
            setMessage({ type: 'success', text: 'Avatar actualizado' });
            setTimeout(() => setMessage(null), 3000);
        }
    };

    const handleAddItem = (field, item) => {
        setFormData(prev => ({
            ...prev,
            [field]: [...prev[field], item]
        }));
    };

    const handleRemoveItem = (field, index) => {
        setFormData(prev => ({
            ...prev,
            [field]: prev[field].filter((_, i) => i !== index)
        }));
    };

    if (loading) {
        return (
            <div className="page-wrapper" style={{ display: 'flex', justifyContent: 'center', paddingTop: '5rem' }}>
                <div style={{ color: 'white' }}>Cargando perfil...</div>
            </div>
        );
    }

    return (
        <div className={`page-wrapper ${styles.profilePage}`}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <AvatarUploader
                        url={formData.avatar_url}
                        size={120}
                        onUpload={handleAvatarUpload}
                    />
                    <div className={styles.headerInfo}>
                        <h1 className={styles.welcome}>{formData.full_name || 'Usuario sin nombre'}</h1>
                        <p className={styles.email}>{user?.email}</p>
                        <span className={styles.roleBadge}>{user?.user_metadata?.role || 'User'}</span>
                    </div>
                </div>

                <div className={styles.card}>
                    <h2 className={styles.sectionTitle}>Información Profesional</h2>

                    <form onSubmit={updateProfile} className={styles.formGrid}>

                        <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                            <label className={styles.label}>Nombre Completo</label>
                            <input
                                type="text"
                                name="full_name"
                                value={formData.full_name}
                                onChange={handleChange}
                                className={styles.input}
                                placeholder="Tu nombre"
                            />
                        </div>

                        {/* 'Rol Profesional' input removed as per user request */}

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Años de Experiencia</label>
                            <input
                                type="number"
                                name="years_of_experience"
                                value={formData.years_of_experience}
                                onChange={handleChange}
                                className={styles.input}
                                placeholder="Ej: 5"
                                min="0"
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>País</label>
                            <input
                                type="text"
                                name="country"
                                value={formData.country}
                                onChange={handleChange}
                                className={styles.input}
                                placeholder="Tu país"
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Ciudad</label>
                            <input
                                type="text"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                className={styles.input}
                                placeholder="Tu ciudad"
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Disponibilidad</label>
                            <select
                                name="availability"
                                value={formData.availability}
                                onChange={handleChange}
                                className={styles.select}
                            >
                                <option value="">Selecciona...</option>
                                <option value="Si">Sí</option>
                                <option value="No">No</option>
                            </select>
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Relocalización</label>
                            <select
                                name="relocation"
                                value={formData.relocation}
                                onChange={handleChange}
                                className={styles.select}
                            >
                                <option value="">Selecciona...</option>
                                <option value="Si">Sí</option>
                                <option value="No">No</option>
                                <option value="Maybe">Quizás</option>
                            </select>
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Preferencia de Trabajo</label>
                            <select
                                name="work_preference"
                                value={formData.work_preference}
                                onChange={handleChange}
                                className={styles.select}
                            >
                                <option value="">Selecciona...</option>
                                <option value="On-site">Presencial (On-site)</option>
                                <option value="Hybrid">Híbrido</option>
                                <option value="Remote">Remoto</option>
                                <option value="Cualquiera">Cualquiera</option>
                            </select>
                        </div>

                        <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                            <label className={styles.label}>LinkedIn URL</label>
                            <input
                                type="url"
                                name="linkedin_url"
                                value={formData.linkedin_url}
                                onChange={handleChange}
                                className={styles.input}
                                placeholder="https://linkedin.com/in/..."
                            />
                        </div>

                        <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                            <label className={styles.label}>Portfolio / Reel URL</label>
                            <input
                                type="url"
                                name="portfolio_url"
                                value={formData.portfolio_url}
                                onChange={handleChange}
                                className={styles.input}
                                placeholder="https://vimeo.com/..."
                            />
                        </div>

                        <div>
                            <DynamicList
                                label="Industrias"
                                items={formData.industries}
                                onAdd={(item) => handleAddItem('industries', item)}
                                onRemove={(idx) => handleRemoveItem('industries', idx)}
                                placeholder="Añadir industria (Cine, TVGames...)"
                            />
                        </div>

                        <div>
                            <DynamicList
                                label="Software"
                                items={formData.software}
                                onAdd={(item) => handleAddItem('software', item)}
                                onRemove={(idx) => handleRemoveItem('software', idx)}
                                placeholder="Añadir software (Maya, Blender...)"
                            />
                        </div>

                        <button
                            type="submit"
                            className={`${styles.saveButton} ${styles.fullWidth}`}
                            disabled={saving}
                        >
                            {saving ? 'Guardando...' : 'Guardar Cambios'}
                        </button>

                        {message && (
                            <div className={`${styles.message} ${message.type === 'success' ? styles.success : styles.error} ${styles.fullWidth}`}>
                                {message.text}
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Profile;
