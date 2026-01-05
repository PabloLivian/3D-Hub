import React, { useState } from 'react';
import styles from './DynamicList.module.css';

const DynamicList = ({ items = [], onAdd, onRemove, placeholder, label }) => {
    const [inputValue, setInputValue] = useState('');

    const handleAdd = (e) => {
        if (e) e.preventDefault();
        if (!inputValue.trim()) return;
        onAdd(inputValue.trim());
        setInputValue('');
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleAdd();
        }
    };

    return (
        <div className={styles.formGroup}>
            <label className={styles.label}>{label}</label>
            <div className={styles.dynamicListContainer}>
                <div className={styles.listInputGroup}>
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className={styles.input}
                        placeholder={placeholder}
                    />
                    <button type="button" onClick={handleAdd} className={styles.addButton}>
                        + Añadir
                    </button>
                </div>
                {items.length > 0 && (
                    <div className={styles.chipContainer}>
                        {items.map((item, index) => (
                            <div key={index} className={styles.chip}>
                                {item}
                                <button
                                    type="button"
                                    onClick={() => onRemove(index)}
                                    className={styles.removeChip}
                                    aria-label="Eliminar"
                                >
                                    &times;
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default DynamicList;
