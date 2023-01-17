import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import calendarAPi from '../api/calendarApi';
import { convertDateEvents } from '../helpers';
import {
  onAddNewEvent,
  onDeleteEvent,
  onLoadEvents,
  onSetActiveEvent,
  onUpdateEvent,
} from '../store/calendar/calendarSlice';

export const useCalendarStore = () => {
  const dispatch = useDispatch();

  const { events, activeEvent } = useSelector((state) => state.calendar);
  const { user } = useSelector((state) => state.auth);

  const setActiveEvent = (calendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent));
  };

  const startSavingEvent = async (calendarEvent) => {
    try {
      if (calendarEvent.id) {
        await calendarAPi.put(`/events/${calendarEvent.id}`, {
          ...calendarEvent,
        });
        dispatch(onUpdateEvent({ ...calendarEvent, user }));
        return;
      }
      //create
      const { data } = await calendarAPi.post('/events', calendarEvent);
      dispatch(onAddNewEvent({ ...calendarEvent, id: data.evento.id, user }));
    } catch (error) {
      Swal.fire('Error save event', error.response.data?.msg, 'error');
    }
  };

  const startLoadingEvents = async () => {
    try {
      const { data } = await calendarAPi.get('/events');
      const events = convertDateEvents(data.eventos);
      dispatch(onLoadEvents(events));
    } catch (error) {}
  };

  const startDeleteEvent = async () => {
    try {
      await calendarAPi.delete(`/events/${activeEvent.id}`);
      dispatch(onDeleteEvent());
    } catch (error) {
      Swal.fire('Error delete event', error.response.data?.msg, error);
    }
  };

  return {
    //*Properties
    events,
    activeEvent,
    hasEventSelected: !!activeEvent?.id,
    //*Methods
    setActiveEvent,
    startSavingEvent,
    startDeleteEvent,
    startLoadingEvents,
  };
};
