import React, { useMemo } from 'react';
import jobsData from '../data/jobs3D.json';
import CompanyCard from '../components/CompanyCard';
import styles from './Companies.module.css';
import dnegLogo from '../assets/DNEG.png';

const companyLogos = {
    'DNEG': dnegLogo,
};

const Companies = () => {
    // Logic to extract unique studios and count their jobs
    const companies = useMemo(() => {
        const studioData = {};

        jobsData.forEach(job => {
            const studio = job.Studio;
            if (studio) {
                if (!studioData[studio]) {
                    studioData[studio] = { count: 0, webpage: job.Webpage };
                }
                studioData[studio].count += 1;
            }
        });

        // Convert to array and sort alphabetically
        return Object.entries(studioData)
            .map(([name, data]) => ({ name, count: data.count, webpage: data.webpage }))
            .sort((a, b) => a.name.localeCompare(b.name));
    }, []);

    return (
        <div className="page-wrapper">
            <div className={styles.companiesPage}>
                <div className="container">
                    <header className={styles.companiesHeader}>
                        <h1 className={styles.pageTitle}>Empresas Destacadas</h1>
                        <p className={styles.pageSubtitle}>Descubre los estudios que están contratando talento 3D ahora mismo.</p>
                    </header>

                    <div className={styles.companiesGrid}>
                        {companies.map(company => (
                            <CompanyCard
                                key={company.name}
                                name={company.name}
                                count={company.count}
                                logo={companyLogos[company.name]}
                                website={company.webpage}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Companies;
