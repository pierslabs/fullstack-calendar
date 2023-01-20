export const events = [
  {
    id: '63c661db97a0943f029fad69',
    title: 'hola',
    notes: 'Multiple services in docker',
    start: new Date('2023-01-19 07:30:00'),
    end: new Date('2023-01-19 08:30:00'),
    user: {
      name: 'Pedro Losas',
      id: '63c661db97a0943f029fad69',
    },
  },
  {
    id: '63c661db97a0943f089797987',
    title: 'Cumple Mama',
    notes: 'Celebrar',
    start: new Date('2023-01-18 07:30:00'),
    end: new Date('2023-01-18 08:30:00'),
    user: {
      name: 'Lilian Losas',
      id: '63c661db97a0943f029fad9-990',
    },
  },
];

export const calendarInitialState = {
  isLoadingEvents: true,
  events: [],
  activeEvent: null,
};

export const calendarWithEventsState = {
  isLoadingEvents: false,
  events: [...events],
  activeEvent: null,
};

export const calendarWithActiveEventState = {
  isLoadingEvents: true,
  events: [...events],
  activeEvent: {
    ...events[0],
  },
};
