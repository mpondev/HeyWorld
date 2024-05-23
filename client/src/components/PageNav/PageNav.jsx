import { useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Squash as Hamburger } from 'hamburger-react';

import Logo from '../Logo/Logo.jsx';

import styles from './PageNav.module.css';

function PageNav() {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  return (
    <nav className={styles.nav}>
      <Logo />

      <ul>
        <li>
          <NavLink to="/product">Product</NavLink>
        </li>
        <li>
          <NavLink to="/pricing">Pricing</NavLink>
        </li>
        <li>
          <NavLink to="/login" className={styles.ctaLink}>
            Login
          </NavLink>
        </li>
      </ul>

      <div ref={ref} className={styles.hamburger}>
        <Hamburger
          toggled={isOpen}
          toggle={setIsOpen}
          size={30}
          label="Show menu"
        />
        {isOpen && (
          <div className={styles['hamburger-menu']}>
            <ul className={styles['hamburger-links']}>
              <li>
                <NavLink to="/product">Product</NavLink>
              </li>
              <li>
                <NavLink to="/pricing">Pricing</NavLink>
              </li>
              <li>
                <NavLink to="/login" className={styles.ctaLink}>
                  Login
                </NavLink>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}

export default PageNav;
