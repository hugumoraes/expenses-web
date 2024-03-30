import React from 'react';

import styles from './styles.module.scss';

export const Home: React.FC = () => (
  <div className={styles.container}>
    <header>Header</header>

    <main className={styles.main}>Hello world</main>
  </div>
);
