import { addHours } from 'date-fns';
import { useCalendarStore, useUiStore } from '../../../hooks';

const FabAddNew = () => {
  const { openDateModal } = useUiStore();
  const { setActiveEvent } = useCalendarStore();

  const handleClickNew = () => {
    setActiveEvent({
      title: '',
      notes: '',
      start: new Date(),
      end: addHours(new Date(), 3),
      bgColor: '#fafafa',
      user: {
        id: '123',
        name: 'Pedro',
      },
    });
    openDateModal();
  };

  return (
    <button className="btn btn-primary fab" onClick={handleClickNew}>
      <i className="fa fa-plus"></i>
    </button>
  );
};

export default FabAddNew;
