import { useNavigate } from 'react-router-dom';
import Button from '../Button/Button.jsx';

function BackButton() {
  const navigate = useNavigate();

  return (
    <Button
      type="back"
      onClick={evt => {
        evt.preventDefault();
        navigate(-1);
      }}
    >
      &larr; Back
    </Button>
  );
}

export default BackButton;
