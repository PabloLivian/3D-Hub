import React, { useMemo, useState, useEffect } from 'react';
import JobCard from '../components/JobCard';
import jobsData from '../data/jobs.json';
import './Jobs.css';

const Jobs = () => {
    // State for filters and pagination
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilters, setActiveFilters] = useState({
        technology: '',
        location: '',
        contract: '',
        experience: ''
    });
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 5;

    // Extract unique options for filters (memoized to avoid recalculation)
    const filterOptions = useMemo(() => {
        const technologies = [...new Set(jobsData.map(job => job.category))].sort();
        const locations = [...new Set(jobsData.map(job => job.location))].sort();
        const contracts = [...new Set(jobsData.map(job => job.contract))].sort();
        const experiences = [...new Set(jobsData.map(job => job.experience))].sort();

        return { technologies, locations, contracts, experiences };
    }, []);

    // Filter jobs based on search query and active filters
    const filteredJobs = useMemo(() => {
        return jobsData.filter(job => {
            // Text Search
            const query = searchQuery.toLowerCase();
            const matchesSearch =
                job.title.toLowerCase().includes(query) ||
                job.company.toLowerCase().includes(query) ||
                job.description.toLowerCase().includes(query) ||
                (job.category && job.category.toLowerCase().includes(query));

            // Dropdown Filters
            const matchesTechnology = activeFilters.technology ? job.category === activeFilters.technology : true;
            const matchesLocation = activeFilters.location ? job.location === activeFilters.location : true;
            const matchesContract = activeFilters.contract ? job.contract === activeFilters.contract : true;
            const matchesExperience = activeFilters.experience ? job.experience === activeFilters.experience : true;

            return matchesSearch && matchesTechnology && matchesLocation && matchesContract && matchesExperience;
        });
    }, [searchQuery, activeFilters]);

    // Reset to first page when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, activeFilters]);

    // Pagination calculations
    const totalPages = Math.ceil(filteredJobs.length / ITEMS_PER_PAGE);
    const currentJobs = filteredJobs.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    // Handlers
    const handleFilterChange = (key, value) => {
        setActiveFilters(prev => ({ ...prev, [key]: value }));
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <div className="jobs-page">
            <div className="container">

                {/* Header Section */}
                <div className="jobs-header">
                    <h1 className="jobs-title">Encuentra tu próximo trabajo</h1>
                    <p className="jobs-subtitle">Explora miles de oportunidades en el sector tecnológico.</p>
                </div>

                {/* Search & Filter Section */}
                <div className="jobs-controls">
                    <div className="jobs-search">
                        <span className="material-symbols-outlined search-icon-input">search</span>
                        <input
                            type="text"
                            className="jobs-search-input"
                            placeholder="Buscar trabajos, empresas o habilidades"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <div className="jobs-filters">
                        <div className="filter-wrapper">
                            <select
                                className="filter-select"
                                value={activeFilters.technology}
                                onChange={(e) => handleFilterChange('technology', e.target.value)}
                            >
                                <option value="">Tecnología</option>
                                {filterOptions.technologies.map(opt => (
                                    <option key={opt} value={opt}>{opt}</option>
                                ))}
                            </select>
                            <span className="material-symbols-outlined filter-arrow">expand_more</span>
                        </div>

                        <div className="filter-wrapper">
                            <select
                                className="filter-select"
                                value={activeFilters.location}
                                onChange={(e) => handleFilterChange('location', e.target.value)}
                            >
                                <option value="">Ubicación</option>
                                {filterOptions.locations.map(opt => (
                                    <option key={opt} value={opt}>{opt}</option>
                                ))}
                            </select>
                            <span className="material-symbols-outlined filter-arrow">expand_more</span>
                        </div>

                        <div className="filter-wrapper">
                            <select
                                className="filter-select"
                                value={activeFilters.contract}
                                onChange={(e) => handleFilterChange('contract', e.target.value)}
                            >
                                <option value="">Tipo de contrato</option>
                                {filterOptions.contracts.map(opt => (
                                    <option key={opt} value={opt}>{opt}</option>
                                ))}
                            </select>
                            <span className="material-symbols-outlined filter-arrow">expand_more</span>
                        </div>

                        <div className="filter-wrapper">
                            <select
                                className="filter-select"
                                value={activeFilters.experience}
                                onChange={(e) => handleFilterChange('experience', e.target.value)}
                            >
                                <option value="">Nivel de experiencia</option>
                                {filterOptions.experiences.map(opt => (
                                    <option key={opt} value={opt}>{opt}</option>
                                ))}
                            </select>
                            <span className="material-symbols-outlined filter-arrow">expand_more</span>
                        </div>
                    </div>
                </div>

                {/* Results Section */}
                <div className="jobs-results">
                    <h2 className="results-title">Resultados de búsqueda</h2>

                    <div className="jobs-list">
                        {currentJobs.length > 0 ? (
                            currentJobs.map(job => (
                                <JobCard
                                    key={job.id}
                                    title={job.title}
                                    company={job.company}
                                    location={job.location}
                                    description={job.description}
                                // Optional: pass tabs/tags if needed, e.g.
                                // tags={[job.contract, job.experience]} 
                                />
                            ))
                        ) : (
                            <div className="no-results">
                                <p>No se encontraron ofertas que coincidan con tu búsqueda.</p>
                            </div>
                        )}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="pagination">
                            <nav className="pagination-nav">
                                <button
                                    className="pagination-btn icon"
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                >
                                    <span className="material-symbols-outlined">chevron_left</span>
                                </button>

                                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                    <button
                                        key={page}
                                        className={`pagination-btn ${currentPage === page ? 'active' : ''}`}
                                        onClick={() => handlePageChange(page)}
                                    >
                                        {page}
                                    </button>
                                ))}

                                <button
                                    className="pagination-btn icon"
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                >
                                    <span className="material-symbols-outlined">chevron_right</span>
                                </button>
                            </nav>
                        </div>
                    )}

                </div>

            </div>
        </div>
    );
};

export default Jobs;
