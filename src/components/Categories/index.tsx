import React from 'react';

import styles from './styles.module.scss';

import { Navbar } from '_components/Navbar';

export const Categories: React.FC = () => {
  return (
    <div className={styles.container}>
      <Navbar />
    </div>
  );
};
