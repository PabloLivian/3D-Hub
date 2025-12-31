import React from 'react';
import { ContactSimpleForm } from '../components/Contact';
import styles from './Contact.module.css';

const Contact = () => {
    return (
        <div className={styles.contactPage}>
            <ContactSimpleForm />
        </div>
    );
};

export default Contact;
