import React from 'react';
import { FaHome, FaAngry } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import styles from './styles.module.scss';

export const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const navigation = [
    {
      icon: <FaHome className={styles.fa} />,
      tooltip: 'Home',
      href: '/',
    },
    {
      icon: <FaAngry className={styles.fa} />,
      tooltip: 'Categories',
      href: '/categories',
    },
  ];

  const handleNavigation = (href: string) => {
    navigate(href);
  };

  return (
    <nav className={styles.sidebar_navigation}>
      <ul>
        {navigation.map((item, index) => (
          <li
            key={index}
            className={styles.active}
            onClick={() => handleNavigation(item.href)}
          >
            {item.icon}
            <span className={styles.tooltip}>{item.tooltip}</span>
          </li>
        ))}
      </ul>
    </nav>
  );
};
