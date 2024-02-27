import { useParams } from 'react-router-dom';

function City() {
  const { id } = useParams();

  return <h1>City {id}</h1>;
}

export default City;
