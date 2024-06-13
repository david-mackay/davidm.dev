// src/components/Contact.js
import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import styles from './Contact.module.css';

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  message: yup.string().required('Message is required'),
});

const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
    // Here you can handle form submission, e.g., send the data to an API
    reset();
  };

  return (
    <div className={styles.contactContainer}>
      <div className={styles.header}>
        <h1>Contact Information</h1>
      </div>
      <div className={styles.content}>
        <div className={styles.contactCard}>
          <h2>David Mackay</h2>
          <p>Full Stack Software Engineer</p>
          <p>NYC, USA</p>
          <p>Phone: <a href="tel:+15617276392">(561) 727-6392</a></p>
          <p>Email: <a href="mailto:mackaydavid808@gmail.com">mackaydavid808@gmail.com</a></p>
          <p>GitHub: <a href="https://github.com/david-mackay" target="_blank" rel="noopener noreferrer">github.com/david-mackay</a></p>
        </div>
        <div className={styles.formContainer}>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.contactForm}>
            <div className={styles.formGroup}>
              <label htmlFor="name">Name</label>
              <input id="name" {...register('name')} />
              {errors.name && <p className={styles.error}>{errors.name.message}</p>}
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="email">Email</label>
              <input id="email" {...register('email')} />
              {errors.email && <p className={styles.error}>{errors.email.message}</p>}
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="message">Message</label>
              <textarea id="message" {...register('message')} />
              {errors.message && <p className={styles.error}>{errors.message.message}</p>}
            </div>
            <button type="submit" className={styles.submitButton}>Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
