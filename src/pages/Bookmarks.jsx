import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../services/supabaseClient';
import JobCard from '../components/JobCard';
import ArtistCard from '../components/ArtistCard';
import { Link } from 'react-router-dom';
import styles from './Bookmarks.module.css';

// Import local data to resolve IDs
import jobsData from '../data/jobs3D.json';
import artistData from '../data/artist.json';

const Bookmarks = () => {
    const { user } = useAuth();
    const [bookmarks, setBookmarks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            setLoading(false);
            return;
        }

        const fetchBookmarks = async () => {
            try {
                const { data, error } = await supabase
                    .from('bookmarks')
                    .select('*')
                    .eq('user_id', user.id);

                if (error) throw error;

                // Process bookmarks to attach real data
                const processedBookmarks = (data || []).map(bookmark => {
                    let itemData = null;

                    if (bookmark.type === 'job') {
                        // Find job in local JSON (assuming ID matches or we handle it)
                        // jobs3D.json has "ID" field
                        itemData = jobsData.find(j => String(j.ID) === bookmark.target_id);
                    } else if (bookmark.type === 'artist') {
                        // artist.json has "id" field
                        itemData = artistData.find(a => String(a.id) === bookmark.target_id);
                    }

                    return {
                        ...bookmark,
                        itemData
                    };
                }).filter(b => b.itemData); // Filter out items not found in local JSON (in case data changed)

                setBookmarks(processedBookmarks);
            } catch (error) {
                console.error('Error fetching bookmarks:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBookmarks();
    }, [user]);

    if (loading) {
        return (
            <div className="page-wrapper" style={{ display: 'flex', justifyContent: 'center', paddingTop: '8rem' }}>
                <div style={{ color: 'var(--text-light)' }}>Cargando marcadores...</div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className={`page-wrapper ${styles.bookmarksPage}`}>
                <div className="container">
                    <div className={styles.emptyState}>
                        <h3>Inicia sesión para ver tus marcadores</h3>
                        <Link to="/login" className={styles.browseBtn}>Iniciar sesión</Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={`page-wrapper ${styles.bookmarksPage}`}>
            <div className="container">
                <h1 className={styles.title}>Mis Marcadores</h1>

                {bookmarks.length === 0 ? (
                    <div className={styles.emptyState}>
                        <h3>No tienes marcadores guardados</h3>
                        <p>Explora ofertas o talento y guárdalos para verlos aquí.</p>
                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                            <Link to="/jobs" className={styles.browseBtn}>Ver Empleos</Link>
                            <Link to="/artists" className={styles.browseBtn}>Ver Talento</Link>
                        </div>
                    </div>
                ) : (
                    <div className={styles.itemsList}>
                        {bookmarks.map((bookmark) => (
                            <div key={bookmark.id}>
                                {bookmark.type === 'job' && (
                                    <JobCard
                                        id={bookmark.itemData.ID}
                                        title={bookmark.itemData.Job_Title}
                                        company={bookmark.itemData.Studio}
                                        location={bookmark.itemData.Country}
                                        description={bookmark.itemData.Notes}
                                        modality={bookmark.itemData.On_Site_Remote_Hybrid}
                                        experience={bookmark.itemData.Experience_Level}
                                        externalLink={bookmark.itemData.Source_Contact}
                                    />
                                )}
                                {bookmark.type === 'artist' && (
                                    <ArtistCard artist={bookmark.itemData} />
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Bookmarks;
