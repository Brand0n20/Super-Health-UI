import React from 'react';
import styles from './Footer.module.css';

/**
 * @description Makes a footer that is styled to always show when you've
 * scrolled to the bottom of the page
 * @returns A site footer with site copyright
 */
const Footer = () => (
  <div className={styles.footer}>
    <p className={styles.footerText}>© DevCo Sports Apparel Inc, a DevCo Ltd Subsidiary</p>
  </div>
);

export default Footer;
