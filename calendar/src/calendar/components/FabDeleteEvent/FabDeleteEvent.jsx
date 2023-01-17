import { useCalendarStore, useUiStore } from '../../../hooks';

const FabDeleteEvent = () => {
  const { startDeleteEvent, hasEventSelected } = useCalendarStore();
  const { closeDateModal, isDateModalOpen, openDateModal } = useUiStore();

  const handleDelete = () => {
    startDeleteEvent();
  };

  return (
    <button
      className="btn btn-danger fab-danger"
      onClick={handleDelete}
      style={{
        display: hasEventSelected ? '' : 'none',
      }}
    >
      <i className="fas fa-trash-alt"></i>
    </button>
  );
};

export default FabDeleteEvent;
