
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import ArtistCard from '../components/ArtistCard';
import Pagination from '../components/Pagination';
import artistData from '../data/artist.json';
import styles from './Artists.module.css';

const Artists = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 12;

    const [filters, setFilters] = useState({
        experiencia: '',
        Relocalizacion: '',
        ciudad: '',
        disponibilidad: '',
        software: ''
    });

    // Derive unique options from data
    const options = useMemo(() => {
        const uniqueCities = [...new Set(artistData.map(a => a.Ciudad).filter(Boolean))].sort();
        const uniqueRelocation = [...new Set(artistData.map(a => a.Relocalizacion).filter(Boolean))].sort();
        const uniqueAvailability = [...new Set(artistData.map(a => a.Disponibilidad).filter(Boolean))].sort();

        // Extract all individual software strings, split by comma, trim, and unique
        const allSoftware = artistData.flatMap(a =>
            a.Software ? a.Software.split(',').map(s => s.trim()) : []
        );
        const uniqueSoftware = [...new Set(allSoftware)].sort();

        return {
            cities: uniqueCities,
            relocation: uniqueRelocation,
            availability: uniqueAvailability,
            software: uniqueSoftware
        };
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
        setCurrentPage(1); // Reset to first page on filter change
    };

    const clearFilters = () => {
        setSearchTerm('');
        setFilters({
            experiencia: '',
            Relocalizacion: '',
            ciudad: '',
            disponibilidad: '',
            software: ''
        });
        setCurrentPage(1);
    };

    const filteredArtists = useMemo(() => {
        return artistData.filter(artist => {
            // 1. Text Search (Search across all values)
            const searchLower = searchTerm.toLowerCase();
            const matchesSearch = Object.values(artist).some(val =>
                String(val).toLowerCase().includes(searchLower)
            );

            if (!matchesSearch) return false;

            // 2. Experience Filter (Numeric Check)
            if (filters.experiencia) {
                // Parse artist experience: handle "15+", "6+ years", "20"
                // Extract first number found.
                const artistExpStr = String(artist.Experiencia || '0');
                const artistExpMatch = artistExpStr.match(/\d+/);
                const artistExp = artistExpMatch ? parseInt(artistExpMatch[0], 10) : 0;

                const filterExp = parseInt(filters.experiencia, 10);

                if (artistExp < filterExp) return false;
            }

            // 3. Relocation Filter (Exact string match for now, or includes)
            if (filters.Relocalizacion && artist.Relocalizacion !== filters.Relocalizacion) {
                return false;
            }

            // 4. City Filter
            if (filters.ciudad && artist.Ciudad !== filters.ciudad) {
                return false;
            }

            // 5. Availability Filter
            if (filters.disponibilidad && artist.Disponibilidad !== filters.disponibilidad) {
                return false;
            }

            // 6. Software Filter (Includes check)
            if (filters.software) {
                const artistSoftware = artist.Software ? artist.Software.toLowerCase() : '';
                if (!artistSoftware.includes(filters.software.toLowerCase())) {
                    return false;
                }
            }

            return true;
        });
    }, [searchTerm, filters]);

    // Pagination Logic
    const totalPages = Math.ceil(filteredArtists.length / ITEMS_PER_PAGE);
    const currentArtists = filteredArtists.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    return (
        <div className="page-wrapper">
            <main className="main-content">
                <section className={styles.headerSection}>
                    <div className="container">
                        <div className={styles.artistsHeader}>
                            <div className={styles.titleRow}>
                                <h1 className={styles.pageTitle} style={{ marginBottom: 0 }}>Talento 3D</h1>
                                <Link to="/join" className={styles.joinButton}>
                                    Join to the list
                                </Link>
                            </div>
                            <p className={styles.pageSubtitle} style={{ marginBottom: 0 }}>
                                Encuentra a los mejores artistas y técnicos para tu próximo proyecto.
                            </p>
                        </div>

                        <div className={styles.searchContainer}>
                            <span className={`material-symbols-outlined ${styles.searchIcon}`}>search</span>
                            <input
                                type="text"
                                placeholder="Buscar por nombre, rol, software..."
                                className={styles.searchInput}
                                value={searchTerm}
                                onChange={(e) => {
                                    setSearchTerm(e.target.value);
                                    setCurrentPage(1);
                                }}
                            />
                        </div>

                        <div className={styles.filtersContainer}>
                            <div className={styles.filterGroup}>
                                <label>Experiencia</label>
                                <select name="experiencia" value={filters.experiencia} onChange={handleChange} className={styles.select}>
                                    <option value="">Cualquiera</option>
                                    <option value="1">1+ años</option>
                                    <option value="3">3+ años</option>
                                    <option value="5">5+ años</option>
                                    <option value="10">10+ años</option>
                                    <option value="20">20+ años</option>
                                </select>
                            </div>

                            <div className={styles.filterGroup}>
                                <label>Relocalización</label>
                                <select name="Relocalizacion" value={filters.Relocalizacion} onChange={handleChange} className={styles.select}>
                                    <option value="">Todas</option>
                                    {options.relocation.map(opt => (
                                        <option key={opt} value={opt}>{opt}</option>
                                    ))}
                                </select>
                            </div>

                            <div className={styles.filterGroup}>
                                <label>Ciudad</label>
                                <select name="ciudad" value={filters.ciudad} onChange={handleChange} className={styles.select}>
                                    <option value="">Todas</option>
                                    {options.cities.map(opt => (
                                        <option key={opt} value={opt}>{opt}</option>
                                    ))}
                                </select>
                            </div>

                            <div className={styles.filterGroup}>
                                <label>Disponibilidad</label>
                                <select name="disponibilidad" value={filters.disponibilidad} onChange={handleChange} className={styles.select}>
                                    <option value="">Cualquiera</option>
                                    {options.availability.map(opt => (
                                        <option key={opt} value={opt}>{opt}</option>
                                    ))}
                                </select>
                            </div>

                            <div className={styles.filterGroup}>
                                <label>Software</label>
                                <select name="software" value={filters.software} onChange={handleChange} className={styles.select}>
                                    <option value="">Cualquiera</option>
                                    {options.software.map(opt => (
                                        <option key={opt} value={opt}>{opt}</option>
                                    ))}
                                </select>
                            </div>

                            <button onClick={clearFilters} className={styles.clearButton}>
                                Limpiar Filtros
                            </button>
                        </div>
                    </div>
                </section>

                <section className={styles.resultsSection}>
                    <div className="container">
                        <div className={styles.resultsContainer}>
                            <div className={styles.resultsCount}>
                                Se encontraron <strong>{filteredArtists.length}</strong> profesionales
                            </div>

                            <div className={styles.grid}>
                                {currentArtists.length > 0 ? (
                                    currentArtists.map((artist, index) => (
                                        <ArtistCard key={index} artist={artist} />
                                    ))
                                ) : (
                                    <div className={styles.noResults}>
                                        <p>No se encontraron artistas con los criterios seleccionados.</p>
                                    </div>
                                )}
                            </div>

                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={(page) => {
                                    setCurrentPage(page);
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                }}
                            />
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Artists;
