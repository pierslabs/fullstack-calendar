import { fireEvent, render, screen } from '@testing-library/react';
import FabDeleteEvent from '../../../src/calendar/components/FabDeleteEvent/FabDeleteEvent';
import { useCalendarStore } from '../../../src/hooks';

jest.mock('../../../src/hooks/useCalendarStore');

describe('FabDeleteComponent not actived event', () => {
  const mockStartDeleteEvent = jest.fn();

  beforeEach(() => jest.clearAllMocks());
  beforeEach(() => jest.clearAllTimers());

  test('should not actived event', () => {
    useCalendarStore.mockReturnValue({
      hasEventSelected: false,
    });
    render(<FabDeleteEvent />);

    const btn = screen.getByLabelText('button-delete');
    expect(btn.classList.toString()).toEqual('btn btn-danger fab-danger');
    expect(btn.style.display).toEqual('none');
  });

  test('should actived event', () => {
    useCalendarStore.mockReturnValue({
      hasEventSelected: true,
    });
    render(<FabDeleteEvent />);

    const btn = screen.getByLabelText('button-delete');
    expect(btn.classList.toString()).toEqual('btn btn-danger fab-danger');
    expect(btn.style.display).toEqual('');
  });

  test('should call startDeleteEvent', () => {
    useCalendarStore.mockReturnValue({
      hasEventSelected: true,
      startDeleteEvent: mockStartDeleteEvent,
    });
    render(<FabDeleteEvent />);

    const btn = screen.getByLabelText('button-delete');
    fireEvent.click(btn);
    expect(mockStartDeleteEvent).toHaveBeenCalled();
  });
});
