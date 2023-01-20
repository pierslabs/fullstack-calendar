import {
  calendarSlice,
  onAddNewEvent,
  onDeleteEvent,
  onLoadEvents,
  onLogOutCalendar,
  onSetActiveEvent,
  onUpdateEvent,
} from '../../../src/store/calendar/calendarSlice';
import {
  calendarInitialState,
  calendarWithActiveEventState,
  calendarWithEventsState,
  events,
} from '../../fixures/calendar.fixure';

describe('Calendarsilce', () => {
  test('should return default state', () => {
    const state = calendarSlice.getInitialState();

    expect(state).toEqual(calendarInitialState);
  });

  test('should onSetActiveEvent', () => {
    const state = calendarSlice.reducer(
      calendarWithEventsState,
      onSetActiveEvent(events[0])
    );

    expect(state.activeEvent).toEqual(events[0]);
  });

  test('should agregate new Event', () => {
    const newEvent = {
      id: '63c661db97a0943f089790-09-87',
      title: 'Reunion',
      notes: 'Account team',
      start: new Date('2023-01-18 10:30:00'),
      end: new Date('2023-01-18 11:30:00'),
      _id: '63c4f6377e583d2ca5039e098',
      user: {
        name: 'Chuck Norris',
        id: '63c661db97a0943f029fad9-777',
      },
    };
    const state = calendarSlice.reducer(
      calendarWithEventsState,
      onAddNewEvent(newEvent)
    );

    expect(state.activeEvent).toEqual(null);
    expect(state.events).toEqual([...events, newEvent]);
  });

  test('should update Event', () => {
    const updatedEvent = {
      id: '63c661db97a0943f029fad69',
      title: 'updated',
      notes: 'Account updated',
      start: new Date('2023-01-18 10:30:00'),
      end: new Date('2023-01-18 11:30:00'),
      user: {
        name: 'Pedro Losas',
        id: '63c661db97a0943f029fad69',
      },
    };
    const state = calendarSlice.reducer(
      calendarWithEventsState,
      onUpdateEvent(updatedEvent)
    );

    expect(state.events).toContain(updatedEvent);
  });

  test('should delete activeEvent', () => {
    const state = calendarSlice.reducer(
      calendarWithActiveEventState,
      onDeleteEvent()
    );

    expect(state.events).not.toContain({
      id: '63c661db97a0943f029fad69',
      title: 'hola',
      notes: 'Multiple services in docker',
      start: new Date('2023-01-19 07:30:00'),
      end: new Date('2023-01-19 08:30:00'),
      user: {
        name: 'Pedro Losas',
        id: '63c661db97a0943f029fad69',
      },
    });

    expect(state.activeEvent).toBe(null);
  });

  test('should onLoadEvents ', () => {
    const state = calendarSlice.reducer(
      calendarWithActiveEventState,
      onLoadEvents(events)
    );

    expect(state.isLoadingEvents).toBe(false);

    const newState = calendarSlice.reducer(
      calendarWithActiveEventState,
      onLoadEvents(events)
    );

    expect(newState.events).toBe(events);
    expect(state.isLoadingEvents).toBe(false);
  });

  test('should onLogOutCalendar ', () => {
    const state = calendarSlice.reducer(
      calendarWithActiveEventState,
      onLogOutCalendar()
    );

    expect(state.isLoadingEvents).toBe(true);
    expect(state.events.length).toBe(0);
    expect(state.activeEvent).toBe(null);
  });
});
