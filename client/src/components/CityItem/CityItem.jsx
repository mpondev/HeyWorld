import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import { useCities } from '../../context/CitiesContext';

import styles from './CityItem.module.css';

const formatDate = date =>
  new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date));

function CityItem({ city }) {
  const { currentCity, deleteCity } = useCities();
  const { cityName, date, emoji, _id, position } = city;

  function handleClick(evt) {
    evt.preventDefault();
    deleteCity(_id);
  }

  return (
    <Link
      className={`${styles.cityItem} ${
        _id === currentCity._id ? styles['cityItem--active'] : ''
      }`}
      to={`${_id}?lat=${position.lat}&lng=${position.lng}`}
    >
      <span className={styles.emoji}>{emoji}</span>
      <h3 className={styles.name}>{cityName}</h3>
      <time className={styles.date}>({formatDate(date)})</time>
      <button className={styles.deleteBtn} onClick={handleClick}>
        &times;
      </button>
    </Link>
  );
}

CityItem.propTypes = {
  city: PropTypes.object,
};

export default CityItem;
