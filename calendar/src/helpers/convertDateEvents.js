import { parseISO } from 'date-fns/esm';

export const convertDateEvents = (events = []) => {
  return events.map((event) => {
    event.end = parseISO(event.end);
    event.start = parseISO(event.start);
    return event;
  });
};
