import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { CalendarPage } from '../../src/calendar/pages';
import { useAuthStore } from '../../src/hooks/useAuthStore';
import AppRouter from '../../src/router/AppRouter';

jest.mock('../../src/hooks/useAuthStore');

jest.mock('../../src/calendar/pages/CalendarPage', () => ({
  CalendarPage: () => <h1>CalendarPage</h1>,
}));

describe('AppRputer', () => {
  const mockCheckAuthToken = jest.fn();

  beforeEach(() => jest.clearAllMocks());

  test('should return default routes', () => {
    /*
    importante cuando hay plugins de terceros a veces que se establecen en el elemnto root
    como por ejemplo el modal,al final es ignorarlo si estamos en testing porque realmente
    el equipo de desarrollo del plugin  ya tendrian que haber realizado ellos las pruebas pertinentes
    otra solucion es mockear todo el plugin, ir a calerndar Modal para ver solucion implementada
    */

    useAuthStore.mockReturnValue({
      status: 'checking',
      checkAuthToken: mockCheckAuthToken,
    });
    render(<AppRouter />);

    expect(screen.getByText('Cargando...')).toBeTruthy();
  });

  test('should return Login if not autenticated', () => {
    /**
     * <MemoryRouter initialEntries={['/auth/']}>
     *  <AppRouter />
     * </MemoryRouter>
     */
    useAuthStore.mockReturnValue({
      status: 'not-authenticated',
      checkAuthToken: mockCheckAuthToken,
    });
    const { container } = render(
      <MemoryRouter initialEntries={['/auth/']}>
        <AppRouter />
      </MemoryRouter>
    );
    expect(screen.getByText('Ingreso')).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  test('should return Calendar if autenticated', () => {
    /**
     * <MemoryRouter initialEntries={['/auth/']}>
     *  <AppRouter />
     * </MemoryRouter>
     */
    useAuthStore.mockReturnValue({
      status: 'authenticated',
      checkAuthToken: mockCheckAuthToken,
    });
    render(
      <MemoryRouter initialEntries={['/auth/']}>
        <AppRouter />
      </MemoryRouter>
    );

    /**
     * Nos dara un error en Calendar si no mockeamos todos los hooks
     * como deberian estar ya probados y seria muy tedioso hacerlos todos
     * haremos un mock directamente del calendar page
     */
    // screen.debug();

    expect(screen.getByText('CalendarPage')).toBeTruthy();
  });
});
