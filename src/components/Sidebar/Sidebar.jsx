import { Outlet } from 'react-router-dom';

import AppNav from '../AppNav/AppNav.jsx';
import Logo from '../Logo/Logo.jsx';

import styles from './Sidebar.module.css';

function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />

      <Outlet />

      <footer className={styles.footer}>
        <p className={styles.copyright}>
          Copyright {new Date().getFullYear()} by HeyWorld Inc.
        </p>
      </footer>
    </div>
  );
}

export default Sidebar;
