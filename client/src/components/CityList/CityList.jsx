import PropTypes from 'prop-types';
import { useCities } from '../../context/CitiesContext.jsx';

import CityItem from '../CityItem/CityItem.jsx';
import Message from '../Message/Message.jsx';
import Spinner from '../Spinner/Spinner.jsx';

import styles from './CityList.module.css';

function CityList() {
  const { cities, isLoading } = useCities();
  if (isLoading) return <Spinner />;

  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );
  return (
    <ul className={styles.cityList}>
      {cities.map(city => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
}

CityList.propTypes = {
  cities: PropTypes.array,
  isLoading: PropTypes.bool,
};

export default CityList;
