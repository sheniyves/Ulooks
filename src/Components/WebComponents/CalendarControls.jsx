import { useNavigation } from 'react-day-picker';
import arrowLeft from '../../assets/Images/left.svg';
import arrowRight from '../../assets/Images/right.svg';

export const CustomPreviousMonthButton = ({ onClick }) => {
  return (
    <button onClick={onClick} className="p-2">
      <img src={arrowLeft} alt="Previous" className="w-5 h-5" />
    </button>
  );
};

export const CustomNextMonthButton = ({ onClick }) => {
  return (
    <button onClick={onClick} className="p-2">
      <img src={arrowRight} alt="Next" className="w-5 h-5" />
    </button>
  );
};
