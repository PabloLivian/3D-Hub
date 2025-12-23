import React, { useState } from 'react';
import styles from './Contact.module.css';

export const ContactSimpleForm = () => {
    const [selectedCountry, setSelectedCountry] = useState("ES");

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData);
        console.log("Form data:", data);
        alert("Mensaje enviado (simulado)");
    };

    return (
        <section className={styles.contactSection}>
            <div className="container">
                <div className={styles.contactHeader}>
                    <h2 className={styles.contactTitle}>Ponte en contacto</h2>
                    <p className={styles.contactDescription}>
                        Nos encantaría saber de ti. Por favor, rellena este formulario.
                    </p>
                </div>

                <form className={styles.contactForm} onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <div className={styles.formRow}>
                            <div className={styles.formField}>
                                <label htmlFor="firstName" className={styles.label}>Nombre</label>
                                <input
                                    id="firstName"
                                    name="firstName"
                                    type="text"
                                    className={styles.input}
                                    placeholder="Nombre"
                                    required
                                />
                            </div>
                            <div className={styles.formField}>
                                <label htmlFor="lastName" className={styles.label}>Apellidos</label>
                                <input
                                    id="lastName"
                                    name="lastName"
                                    type="text"
                                    className={styles.input}
                                    placeholder="Apellidos"
                                    required
                                />
                            </div>
                        </div>

                        <div className={styles.formField}>
                            <label htmlFor="email" className={styles.label}>Email</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                className={styles.input}
                                placeholder="tu@whateveryouwant.com"
                                required
                            />
                        </div>

                        <div className={styles.formField}>
                            <label htmlFor="phone" className={styles.label}>Número de teléfono</label>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <select
                                    className={styles.select}
                                    style={{ width: '100px' }}
                                    value={selectedCountry}
                                    onChange={(e) => setSelectedCountry(e.target.value)}
                                    name="countryCode"
                                >
                                    <option value="ES">ES +34</option>
                                    <option value="US">US +1</option>
                                    <option value="MX">MX +52</option>
                                    <option value="AR">AR +54</option>
                                    <option value="CO">CO +57</option>
                                </select>
                                <input
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    className={styles.input}
                                    placeholder="Teléfono"
                                />
                            </div>
                        </div>

                        <div className={styles.formField}>
                            <label htmlFor="message" className={styles.label}>Mensaje</label>
                            <textarea
                                id="message"
                                name="message"
                                className={styles.textarea}
                                placeholder="Déjanos un mensaje..."
                                rows="5"
                                required
                            ></textarea>
                        </div>

                        <div className={styles.checkboxGroup}>
                            <input
                                id="privacy"
                                name="privacy"
                                type="checkbox"
                                className={styles.checkbox}
                                required
                            />
                            <label htmlFor="privacy" className={styles.checkboxLabel}>
                                Aceptas nuestra amigable <a href="#" className={styles.link}>política de privacidad</a>.
                            </label>
                        </div>
                    </div>

                    <button type="submit" className={styles.submitButton}>
                        Enviar mensaje
                    </button>
                </form>
            </div>
        </section>
    );
};
