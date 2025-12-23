import React, { useMemo, useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import JobCard from '../components/JobCard';
import Pagination from '../components/Pagination';
import jobsData from '../data/jobs3D.json';
import styles from './Jobs.module.css';

const Jobs = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    // Derived state from URL
    const currentPage = parseInt(searchParams.get('page') || '1', 10);
    const filtersFromUrl = {
        jobTitle: searchParams.get('jobTitle') || '',
        experience: searchParams.get('experience') || '',
        modality: searchParams.get('modality') || '',
        country: searchParams.get('country') || ''
    };

    const initialQuery = searchParams.get('q') || '';
    const [searchQuery, setSearchQuery] = useState(initialQuery);

    // Sync URL 'q' changes back to local state
    const currentUrlQ = searchParams.get('q') || '';
    useEffect(() => {
        setSearchQuery(currentUrlQ);
    }, [currentUrlQ]);

    const ITEMS_PER_PAGE = 10;

    // Extract unique options for filters
    const filterOptions = useMemo(() => {
        const jobTitles = [...new Set(jobsData.map(job => job.Job_Title))].sort();

        // For multi-value fields (comma separated), we might want to split them to get unique individual options
        // But for the dropdown, usually users expect to filter by specific criteria.
        // Let's collect unique individual values for Experience and Modality.

        const experienceSet = new Set();
        jobsData.forEach(job => {
            if (job.Experience_Level) {
                job.Experience_Level.split(',').forEach(item => experienceSet.add(item.trim()));
            }
        });
        const experiences = [...experienceSet].sort();

        const modalitySet = new Set();
        jobsData.forEach(job => {
            if (job.On_Site_Remote_Hybrid) {
                job.On_Site_Remote_Hybrid.split(',').forEach(item => modalitySet.add(item.trim()));
            }
        });
        const modalities = [...modalitySet].sort();

        const countries = [...new Set(jobsData.map(job => job.Country))].sort();

        return { jobTitles, experiences, modalities, countries };
    }, []);

    // Filter jobs based on URL params
    const filteredJobs = useMemo(() => {
        return jobsData.filter(job => {
            const query = searchQuery.toLowerCase();
            const matchesSearch =
                job.Job_Title.toLowerCase().includes(query) ||
                job.Studio.toLowerCase().includes(query) ||
                (job.Notes && job.Notes.toLowerCase().includes(query));

            // Dropdown Filters
            const matchesJobTitle = filtersFromUrl.jobTitle ? job.Job_Title === filtersFromUrl.jobTitle : true;

            // For Experience and Modality, check if the job "includes" the selected filter value
            const matchesExperience = filtersFromUrl.experience
                ? job.Experience_Level && job.Experience_Level.includes(filtersFromUrl.experience)
                : true;

            const matchesModality = filtersFromUrl.modality
                ? job.On_Site_Remote_Hybrid && job.On_Site_Remote_Hybrid.includes(filtersFromUrl.modality)
                : true;

            const matchesCountry = filtersFromUrl.country ? job.Country === filtersFromUrl.country : true;

            return matchesSearch && matchesJobTitle && matchesExperience && matchesModality && matchesCountry;
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
            newParams.set('page', '1');
            return newParams;
        });
    };

    const handleClearFilters = () => {
        setSearchQuery('');
        setSearchParams({});
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
                    <p className={styles.jobsSubtitle}>Explora miles de oportunidades en la industria 3D.</p>
                </div>

                {/* Search & Filter Section */}
                <div className={styles.jobsControls}>
                    <div className={styles.jobsSearch}>
                        <span className={`material-symbols-outlined ${styles.searchIconInput}`}>search</span>
                        <input
                            type="text"
                            className={styles.jobsSearchInput}
                            placeholder="Buscar trabajos, estudios..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <div className={styles.jobsFilters}>
                        <div className={styles.filterWrapper}>
                            <select
                                className={styles.filterSelect}
                                value={filtersFromUrl.jobTitle}
                                onChange={(e) => handleFilterChange('jobTitle', e.target.value)}
                            >
                                <option value="">Especialidad</option>
                                {filterOptions.jobTitles.map(opt => (
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
                                <option value="">Experiencia</option>
                                {filterOptions.experiences.map(opt => (
                                    <option key={opt} value={opt}>{opt}</option>
                                ))}
                            </select>
                            <span className={`material-symbols-outlined ${styles.filterArrow}`}>expand_more</span>
                        </div>

                        <div className={styles.filterWrapper}>
                            <select
                                className={styles.filterSelect}
                                value={filtersFromUrl.modality}
                                onChange={(e) => handleFilterChange('modality', e.target.value)}
                            >
                                <option value="">Modalidad</option>
                                {filterOptions.modalities.map(opt => (
                                    <option key={opt} value={opt}>{opt}</option>
                                ))}
                            </select>
                            <span className={`material-symbols-outlined ${styles.filterArrow}`}>expand_more</span>
                        </div>

                        <div className={styles.filterWrapper}>
                            <select
                                className={styles.filterSelect}
                                value={filtersFromUrl.country}
                                onChange={(e) => handleFilterChange('country', e.target.value)}
                            >
                                <option value="">País</option>
                                {filterOptions.countries.map(opt => (
                                    <option key={opt} value={opt}>{opt}</option>
                                ))}
                            </select>
                            <span className={`material-symbols-outlined ${styles.filterArrow}`}>expand_more</span>
                        </div>

                        <button className={styles.btnClear} onClick={handleClearFilters}>
                            Limpiar filtros
                        </button>
                    </div>
                </div>

                {/* Results Section */}
                <div className={styles.jobsResults}>
                    <h2 className={styles.resultsTitle}>Resultados de búsqueda</h2>

                    <div className={styles.jobsList}>
                        {currentJobs.length > 0 ? (
                            currentJobs.map(job => (
                                <JobCard
                                    key={job.ID}
                                    id={job.ID}
                                    title={job.Job_Title}
                                    company={job.Studio}
                                    location={`${job.City}${job.City && job.Country ? ', ' : ''}${job.Country}`}
                                    description={job.Notes}
                                    modality={job.On_Site_Remote_Hybrid}
                                    experience={job.Experience_Level}
                                    externalLink={job.Source_Contact}
                                    className={styles.jobListItem}
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
