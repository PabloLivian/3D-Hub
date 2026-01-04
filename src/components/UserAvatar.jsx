import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../services/supabaseClient';
import styles from './UserAvatar.module.css';

const UserAvatar = () => {
    const { user } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [avatarUrl, setAvatarUrl] = useState(null);
    const menuRef = useRef(null);

    // Fetch profile avatar
    useEffect(() => {
        if (!user) return;

        const getProfile = async () => {
            try {
                const { data, error } = await supabase
                    .from('profiles')
                    .select('avatar_url')
                    .eq('id', user.id)
                    .single();

                if (data?.avatar_url) {
                    setAvatarUrl(data.avatar_url);
                } else if (user.user_metadata?.avatar_url) {
                    // Fallback to Google avatar if available
                    setAvatarUrl(user.user_metadata.avatar_url);
                }
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };

        getProfile();
    }, [user]);

    // Click outside to close
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const toggleMenu = () => setIsOpen(!isOpen);

    const getInitials = (email) => {
        return email ? email[0].toUpperCase() : 'U';
    };

    if (!user) return null;

    return (
        <div className={styles.avatarContainer} ref={menuRef}>
            <div className={styles.avatar} onClick={toggleMenu}>
                {avatarUrl ? (
                    <img
                        src={avatarUrl}
                        alt="User Profile"
                        className={styles.avatarImage}
                        onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
                    />
                ) : null}
                <div
                    className={styles.avatarPlaceholder}
                    style={{ display: avatarUrl ? 'none' : 'flex' }}
                >
                    {getInitials(user.email)}
                </div>
            </div>

            {isOpen && (
                <div className={styles.dropdown}>
                    <div className={styles.userInfo}>
                        <span className={styles.userName}>{user.user_metadata?.full_name || 'Usuario'}</span>
                        <span className={styles.userEmail}>{user.email}</span>
                    </div>

                    <Link to="/profile" className={styles.menuItem} onClick={() => setIsOpen(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                        Perfil
                    </Link>

                    <Link to="/bookmarks" className={styles.menuItem} onClick={() => setIsOpen(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                        </svg>
                        Marcadores
                    </Link>
                </div>
            )}
        </div>
    );
};

export default UserAvatar;
