import calendarAPi from '../../src/api/calendarApi';

describe('CalendarApi', () => {
  test('should default config', () => {
    expect(calendarAPi.defaults.baseURL).toBe(process.env.VITE_API_URL);
  });

  test('should have x-token in headers ', async () => {
    const token = 'Abc-12';
    localStorage.setItem('token', token);

    const res = await calendarAPi.get('/auth');

    expect(res.config.headers['x-token']).toBe(token);
  });
});
