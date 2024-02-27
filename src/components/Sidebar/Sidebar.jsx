import AppNav from '../AppNav/AppNav.jsx';
import Logo from '../Logo/Logo.jsx';

import styles from './Sidebar.module.css';

function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />

      <p>List of cities</p>
      <footer className={styles.footer}>
        <p className={styles.copyright}>
          Copyright {new Date().getFullYear()} by HeyWorld Inc.
        </p>
      </footer>
    </div>
  );
}

export default Sidebar;
