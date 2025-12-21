import React, { useMemo, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import JobCard from '../components/JobCard';
import Pagination from '../components/Pagination';
import jobsData from '../data/jobs.json';
import styles from './Jobs.module.css';

const Jobs = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const initialQuery = queryParams.get('q') || '';

    // State for filters and pagination
    const [searchQuery, setSearchQuery] = useState(initialQuery);
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

    // Sync URL query with state (optional, or just one-way from URL to initial state)
    // Here we reset pages when filters change, but we also want to react to URL changes if the user navigates back/forward
    useEffect(() => {
        const query = queryParams.get('q') || '';
        setSearchQuery(query);
    }, [location.search]);

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
        <div className={styles.jobsPage}>
            <div className="container">

                {/* Header Section */}
                <div className={styles.jobsHeader}>
                    <h1 className={styles.jobsTitle}>Encuentra tu próximo trabajo</h1>
                    <p className={styles.jobsSubtitle}>Explora miles de oportunidades en el sector tecnológico.</p>
                </div>

                {/* Search & Filter Section */}
                <div className={styles.jobsControls}>
                    <div className={styles.jobsSearch}>
                        <span className={`material-symbols-outlined ${styles.searchIconInput}`}>search</span>
                        <input
                            type="text"
                            className={styles.jobsSearchInput}
                            placeholder="Buscar trabajos, empresas o habilidades"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <div className={styles.jobsFilters}>
                        <div className={styles.filterWrapper}>
                            <select
                                className={styles.filterSelect}
                                value={activeFilters.technology}
                                onChange={(e) => handleFilterChange('technology', e.target.value)}
                            >
                                <option value="">Tecnología</option>
                                {filterOptions.technologies.map(opt => (
                                    <option key={opt} value={opt}>{opt}</option>
                                ))}
                            </select>
                            <span className={`material-symbols-outlined ${styles.filterArrow}`}>expand_more</span>
                        </div>

                        <div className={styles.filterWrapper}>
                            <select
                                className={styles.filterSelect}
                                value={activeFilters.location}
                                onChange={(e) => handleFilterChange('location', e.target.value)}
                            >
                                <option value="">Ubicación</option>
                                {filterOptions.locations.map(opt => (
                                    <option key={opt} value={opt}>{opt}</option>
                                ))}
                            </select>
                            <span className={`material-symbols-outlined ${styles.filterArrow}`}>expand_more</span>
                        </div>

                        <div className={styles.filterWrapper}>
                            <select
                                className={styles.filterSelect}
                                value={activeFilters.contract}
                                onChange={(e) => handleFilterChange('contract', e.target.value)}
                            >
                                <option value="">Tipo de contrato</option>
                                {filterOptions.contracts.map(opt => (
                                    <option key={opt} value={opt}>{opt}</option>
                                ))}
                            </select>
                            <span className={`material-symbols-outlined ${styles.filterArrow}`}>expand_more</span>
                        </div>

                        <div className={styles.filterWrapper}>
                            <select
                                className={styles.filterSelect}
                                value={activeFilters.experience}
                                onChange={(e) => handleFilterChange('experience', e.target.value)}
                            >
                                <option value="">Nivel de experiencia</option>
                                {filterOptions.experiences.map(opt => (
                                    <option key={opt} value={opt}>{opt}</option>
                                ))}
                            </select>
                            <span className={`material-symbols-outlined ${styles.filterArrow}`}>expand_more</span>
                        </div>
                    </div>
                </div>

                {/* Results Section */}
                <div className={styles.jobsResults}>
                    <h2 className={styles.resultsTitle}>Resultados de búsqueda</h2>

                    <div className={styles.jobsList}>
                        {currentJobs.length > 0 ? (
                            currentJobs.map(job => (
                                <JobCard
                                    key={job.id}
                                    title={job.title}
                                    company={job.company}
                                    location={job.location}
                                    description={job.description}
                                    className={styles.jobListItem}
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
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />

                </div>

            </div>
        </div>
    );
};

export default Jobs;
