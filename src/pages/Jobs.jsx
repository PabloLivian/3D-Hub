import React, { useMemo, useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import JobCard from '../components/JobCard';
import Pagination from '../components/Pagination';
import jobsData from '../data/jobs.json';
import styles from './Jobs.module.css';

const Jobs = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    // Derived state from URL
    const currentPage = parseInt(searchParams.get('page') || '1', 10);
    const filtersFromUrl = {
        technology: searchParams.get('technology') || '',
        location: searchParams.get('location') || '',
        contract: searchParams.get('contract') || '',
        experience: searchParams.get('experience') || ''
    };

    const initialQuery = searchParams.get('q') || '';
    const [searchQuery, setSearchQuery] = useState(initialQuery);

    // Sync URL 'q' changes back to local state (e.g. navigation)
    useEffect(() => {
        setSearchQuery(searchParams.get('q') || '');
    }, [searchParams]);

    const ITEMS_PER_PAGE = 5;

    // Extract unique options for filters (memoized to avoid recalculation)
    const filterOptions = useMemo(() => {
        const technologies = [...new Set(jobsData.map(job => job.category))].sort();
        const locations = [...new Set(jobsData.map(job => job.location))].sort();
        const contracts = [...new Set(jobsData.map(job => job.contract))].sort();
        const experiences = [...new Set(jobsData.map(job => job.experience))].sort();

        return { technologies, locations, contracts, experiences };
    }, []);

    // Filter jobs based on URL params (source of truth)
    const filteredJobs = useMemo(() => {
        return jobsData.filter(job => {
            // Text Search (from local state or URL? better use URL for consistency in render)
            // But we want live feedback. Let's use local searchQuery for filtering to be instant
            // while the URL updates debounced.
            // ACTUALLY: User asked for URL to update. If we filter by searchQuery (local),
            // and URL lags, it breaks "reload gives same result" if we are mid-typing.
            // Let's filter by searchQuery which is synced with URL.

            const query = searchQuery.toLowerCase();
            const matchesSearch =
                job.title.toLowerCase().includes(query) ||
                job.company.toLowerCase().includes(query) ||
                job.description.toLowerCase().includes(query) ||
                (job.category && job.category.toLowerCase().includes(query));

            // Dropdown Filters
            const matchesTechnology = filtersFromUrl.technology ? job.category === filtersFromUrl.technology : true;
            const matchesLocation = filtersFromUrl.location ? job.location === filtersFromUrl.location : true;
            const matchesContract = filtersFromUrl.contract ? job.contract === filtersFromUrl.contract : true;
            const matchesExperience = filtersFromUrl.experience ? job.experience === filtersFromUrl.experience : true;

            return matchesSearch && matchesTechnology && matchesLocation && matchesContract && matchesExperience;
        });
    }, [searchQuery, filtersFromUrl]);

    // Update URL when Search Query Changes (Debounced)
    useEffect(() => {
        const timer = setTimeout(() => {
            const currentQ = searchParams.get('q') || '';
            if (searchQuery !== currentQ) {
                setSearchParams(prev => {
                    const newParams = new URLSearchParams(prev);
                    if (searchQuery) newParams.set('q', searchQuery);
                    else newParams.delete('q');
                    // Reset page on new search
                    newParams.set('page', '1');
                    return newParams;
                }, { replace: true });
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [searchQuery, setSearchParams, searchParams]);


    // Pagination calculations
    const totalPages = Math.ceil(filteredJobs.length / ITEMS_PER_PAGE);
    const currentJobs = filteredJobs.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    // Handlers
    const handleFilterChange = (key, value) => {
        setSearchParams(prev => {
            const newParams = new URLSearchParams(prev);
            if (value) newParams.set(key, value);
            else newParams.delete(key);
            newParams.set('page', '1'); // Reset to page 1 on filter change
            return newParams;
        });
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setSearchParams(prev => {
                const newParams = new URLSearchParams(prev);
                newParams.set('page', newPage.toString());
                return newParams;
            });
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
                                value={filtersFromUrl.technology}
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
                                value={filtersFromUrl.location}
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
                                value={filtersFromUrl.contract}
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
                                value={filtersFromUrl.experience}
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
