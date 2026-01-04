import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../services/supabaseClient';
import styles from './BookmarkButton.module.css';

const BookmarkButton = ({ targetId, targetType }) => {
    const { user } = useAuth();
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    // Determine visibility based on role
    useEffect(() => {
        if (!user) {
            setIsVisible(false);
            return;
        }

        const role = user.user_metadata?.role;

        // Logic: 
        // Artists (role 'artist') can bookmark Jobs ('job')
        // Companies (role 'company') can bookmark Artists ('artist')

        if (role === 'artist' && targetType === 'job') {
            setIsVisible(true);
        } else if (role === 'company' && targetType === 'artist') {
            setIsVisible(true);
        } else {
            console.log('BookmarkButton hidden. Reason:', { role, targetType, userMetadata: user.user_metadata });
            setIsVisible(false);
        }
    }, [user, targetType]);

    // Check if already bookmarked
    useEffect(() => {
        if (!user || !isVisible) return;

        const checkBookmark = async () => {
            try {
                const { data, error } = await supabase
                    .from('bookmarks')
                    .select('id')
                    .eq('user_id', user.id)
                    .eq('target_id', targetId)
                    .eq('type', targetType)
                    .single();

                if (data) {
                    setIsBookmarked(true);
                }
            } catch (error) {
                // Ignore error if not found (it just means not bookmarked)
            }
        };

        checkBookmark();
    }, [user, isVisible, targetId, targetType]);

    const handleToggleBookmark = async (e) => {
        e.preventDefault(); // Prevent triggering parent Link/Card click
        e.stopPropagation();

        if (loading || !user || !isVisible) return;
        setLoading(true);

        try {
            if (isBookmarked) {
                // Remove bookmark
                await supabase
                    .from('bookmarks')
                    .delete()
                    .eq('user_id', user.id)
                    .eq('target_id', targetId)
                    .eq('type', targetType);

                setIsBookmarked(false);
            } else {
                // Add bookmark
                await supabase
                    .from('bookmarks')
                    .insert([
                        { user_id: user.id, target_id: targetId, type: targetType }
                    ]);

                setIsBookmarked(true);
            }
        } catch (error) {
            console.error('Error toggling bookmark:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            className={`${styles.bookmarkBtn} ${isBookmarked ? styles.active : ''} ${!isVisible ? styles.disabled : ''}`}
            onClick={handleToggleBookmark}
            disabled={loading || !isVisible}
            aria-label={isBookmarked ? 'Eliminar de marcadores' : 'Añadir a marcadores'}
            title={!isVisible ? 'No disponible para tu rol' : (isBookmarked ? 'Guardado' : 'Guardar')}
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill={isBookmarked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
            </svg>
        </button>
    );
};

export default BookmarkButton;
