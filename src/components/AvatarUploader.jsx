import { useState, useEffect } from 'react';
import { supabase } from '../services/supabaseClient';
import styles from './AvatarUploader.module.css';

const AvatarUploader = ({ url, size, onUpload, editable = true }) => {
    const [avatarUrl, setAvatarUrl] = useState(null);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        if (url) downloadImage(url);
    }, [url]);

    const downloadImage = async (path) => {
        try {
            // Check if it's a full URL (Google or already public) or a path
            if (path.startsWith('http')) {
                setAvatarUrl(path);
                return;
            }

            const { data, error } = await supabase.storage.from('avatars').download(path);
            if (error) {
                throw error;
            }
            const url = URL.createObjectURL(data);
            setAvatarUrl(url);
        } catch (error) {
            console.error('Error downloading image: ', error.message);
        }
    };

    const uploadAvatar = async (event) => {
        try {
            setUploading(true);

            if (!event.target.files || event.target.files.length === 0) {
                throw new Error('You must select an image to upload.');
            }

            const file = event.target.files[0];
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `${fileName}`;

            const { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, file);

            if (uploadError) {
                throw uploadError;
            }

            // Get Public URL immediately to store in DB? 
            // Or just store path? 
            // Standard is storing path for private buckets, but for public avatars using Public URL is easier for <img> tags.
            // Let's get the public URL.
            const { data: { publicUrl } } = supabase.storage.from('avatars').getPublicUrl(filePath);

            onUpload(publicUrl); // Pass back the full public URL
        } catch (error) {
            alert(error.message);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className={styles.avatarContainer} style={{ width: size, height: size }}>
            {avatarUrl ? (
                <img
                    src={avatarUrl}
                    alt="Avatar"
                    className={styles.avatarImage}
                    style={{ height: size, width: size }}
                />
            ) : (
                <div className={styles.avatarPlaceholder} style={{ height: size, width: size }}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="50%" height="50%">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                </div>
            )}
            {editable && (
                <>
                    {/* The click input covers the whole area */}
                    <label className={styles.uploadOverlay} htmlFor="single">
                        <input
                            style={{
                                display: 'none',
                            }}
                            type="file"
                            id="single"
                            accept="image/*"
                            onChange={uploadAvatar}
                            disabled={uploading}
                        />
                    </label>

                    {/* The visible icon in corner */}
                    <div className={styles.editButton}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                            <title>camera</title>
                            <path fill="currentColor" d="M11.5 8C14 8 16 10 16 12.5S14 17 11.5 17S7 15 7 12.5S9 8 11.5 8m0 1A3.5 3.5 0 0 0 8 12.5a3.5 3.5 0 0 0 3.5 3.5a3.5 3.5 0 0 0 3.5-3.5A3.5 3.5 0 0 0 11.5 9M5 5h2l2-2h5l2 2h2a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V8a3 3 0 0 1 3-3m4.41-1l-2 2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h13a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-2.41l-2-2z" />
                        </svg>
                    </div>
                </>
            )}
        </div>
    );
};

export default AvatarUploader;
