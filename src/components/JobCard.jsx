import React, { useState } from 'react';
import './JobCard.css';

const JobCard = ({ title, company, location, description }) => {
    const [isApplied, setIsApplied] = useState(false);

    const handleApply = () => {
        setIsApplied(true);
    };

    return (
        <div className="job-card">
            <div className="job-card-content">
                <div className="job-info">
                    <h3 className="job-title">{title}</h3>
                    <p className="job-meta">{company} | {location}</p>
                    <p className="job-description">{description}</p>
                </div>
                <div className="job-action">
                    <button
                        className={`btn-apply ${isApplied ? 'applied' : ''}`}
                        onClick={handleApply}
                        disabled={isApplied}
                    >
                        {isApplied ? 'Aplicado' : 'Aplicar'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default JobCard;
