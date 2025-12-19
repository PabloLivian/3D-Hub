import React from 'react';
import './Hero.css';

const Hero = () => {
    return (
        <section className="hero">
            <div className="container hero-container">
                <h1 className="hero-title">Encuentra el trabajo de tus sueños</h1>
                <p className="hero-subtitle">
                    Únete a la comunidad más grande de desarrolladores y encuentra tu próxima oportunidad.
                </p>

                <div className="search-form-container">
                    <form className="search-form">
                        <span className="search-icon">
                            <svg fill="currentColor" height="24" viewBox="0 0 256 256" width="24"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z">
                                </path>
                            </svg>
                        </span>
                        <input
                            className="search-input"
                            placeholder="Buscar empleos por título, habilidad o empresa"
                            type="text"
                        />
                        <button className="search-button" type="submit">Buscar</button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Hero;
