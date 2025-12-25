import React, { useState } from 'react';
import styles from './JoinList.module.css';

const DynamicList = ({ items, onAdd, onRemove, placeholder, label }) => {
    const [inputValue, setInputValue] = useState('');

    const handleAdd = (e) => {
        if (e) e.preventDefault();
        if (!inputValue.trim()) return;
        onAdd(inputValue.trim());
        setInputValue('');
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleAdd();
        }
    };

    return (
        <div className={`${styles.formGroup} ${styles.fullWidth}`}>
            <label className={styles.label}>{label}</label>
            <div className={styles.dynamicListContainer}>
                <div className={styles.listInputGroup}>
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className={styles.input}
                        placeholder={placeholder}
                    />
                    <button type="button" onClick={handleAdd} className={styles.addButton}>
                        + Añadir
                    </button>
                </div>
                <div className={styles.chipContainer}>
                    {items.map((item, index) => (
                        <div key={index} className={styles.chip}>
                            {item}
                            <button
                                type="button"
                                onClick={() => onRemove(index)}
                                className={styles.removeChip}
                                aria-label="Eliminar"
                            >
                                &times;
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const JoinList = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        rol: '',
        pais: '',
        ciudad: '',
        disponibilidad: '',
        experiencia: '',
        industrias: [],
        reel: '',
        linkedin: '',
        relocalizacion: '',
        preferencia: '',
        software: []
    });

    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
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

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Data:', formData);
        setSubmitted(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (submitted) {
        return (
            <div className={styles.pageWrapper}>
                <div className={styles.container}>
                    <div className={styles.card}>
                        <div className={styles.successMessage}>
                            ¡Gracias por unirte! Tu perfil ha sido recibido.
                        </div>
                        <button
                            className={styles.submitButton}
                            onClick={() => window.location.href = '/artists'}
                            style={{ width: '100%', marginTop: 0 }}
                        >
                            Volver a Talento
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.pageWrapper}>
            <div className={styles.container}>
                <div className={styles.card}>
                    <h1 className={styles.title}>Join the Squad</h1>
                    <p className={styles.subtitle}>Únete a nuestra lista de talento exclusivo</p>

                    <form onSubmit={handleSubmit} className={styles.formGrid}>
                        {/* Nombre */}
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Nombre</label>
                            <input
                                type="text"
                                name="nombre"
                                value={formData.nombre}
                                onChange={handleChange}
                                className={styles.input}
                                required
                                placeholder="Tu nombre completo"
                            />
                        </div>

                        {/* Rol */}
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Rol</label>
                            <input
                                type="text"
                                name="rol"
                                value={formData.rol}
                                onChange={handleChange}
                                className={styles.input}
                                required
                                placeholder="Ej: VFX Artist, Rigger..."
                            />
                        </div>

                        {/* País */}
                        <div className={styles.formGroup}>
                            <label className={styles.label}>País</label>
                            <input
                                type="text"
                                name="pais"
                                value={formData.pais}
                                onChange={handleChange}
                                className={styles.input}
                                required
                                placeholder="País de residencia"
                            />
                        </div>

                        {/* Ciudad */}
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Ciudad</label>
                            <input
                                type="text"
                                name="ciudad"
                                value={formData.ciudad}
                                onChange={handleChange}
                                className={styles.input}
                                required
                                placeholder="Ciudad actual"
                            />
                        </div>

                        {/* Disponibilidad */}
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Disponibilidad</label>
                            <select
                                name="disponibilidad"
                                value={formData.disponibilidad}
                                onChange={handleChange}
                                className={styles.select}
                                required
                            >
                                <option value="" disabled>Selecciona...</option>
                                <option value="Si">Sí</option>
                                <option value="No">No</option>
                            </select>
                        </div>

                        {/* Experiencia */}
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Años de Experiencia</label>
                            <input
                                type="number"
                                name="experiencia"
                                value={formData.experiencia}
                                onChange={handleChange}
                                className={styles.input}
                                min="0"
                                required
                            />
                        </div>

                        {/* Relocalización */}
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Relocalización</label>
                            <select
                                name="relocalizacion"
                                value={formData.relocalizacion}
                                onChange={handleChange}
                                className={styles.select}
                                required
                            >
                                <option value="" disabled>Selecciona...</option>
                                <option value="Si">Sí</option>
                                <option value="No">No</option>
                                <option value="Maybe">Maybe</option>
                            </select>
                        </div>

                        {/* Preferencia */}
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Preferencia de Trabajo</label>
                            <select
                                name="preferencia"
                                value={formData.preferencia}
                                onChange={handleChange}
                                className={styles.select}
                                required
                            >
                                <option value="" disabled>Selecciona...</option>
                                <option value="On-site">On-site</option>
                                <option value="Hybrid">Hybrid</option>
                                <option value="Remote">Remote</option>
                                <option value="Cualquiera">Cualquiera</option>
                            </select>
                        </div>

                        {/* LinkedIn */}
                        <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                            <label className={styles.label}>LinkedIn URL</label>
                            <input
                                type="url"
                                name="linkedin"
                                value={formData.linkedin}
                                onChange={handleChange}
                                className={styles.input}
                                placeholder="https://linkedin.com/in/..."
                            />
                        </div>

                        {/* Reel */}
                        <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                            <label className={styles.label}>Reel / Portfolio URL</label>
                            <input
                                type="url"
                                name="reel"
                                value={formData.reel}
                                onChange={handleChange}
                                className={styles.input}
                                placeholder="https://vimeo.com/..."
                            />
                        </div>

                        {/* Industrias (Dynamic List) */}
                        <DynamicList
                            label="Industrias"
                            items={formData.industrias}
                            onAdd={(item) => handleAddItem('industrias', item)}
                            onRemove={(index) => handleRemoveItem('industrias', index)}
                            placeholder="Escribe una industria y pulsa Añadir (ej: Publicidad, Cine...)"
                        />

                        {/* Software (Dynamic List) */}
                        <DynamicList
                            label="Software"
                            items={formData.software}
                            onAdd={(item) => handleAddItem('software', item)}
                            onRemove={(index) => handleRemoveItem('software', index)}
                            placeholder="Escribe un software y pulsa Añadir (ej: Maya, Nuke...)"
                        />

                        <button type="submit" className={`${styles.submitButton} ${styles.fullWidth}`}>
                            Join the Squad
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default JoinList;
