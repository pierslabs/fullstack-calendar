import { configureStore } from '@reduxjs/toolkit';
import { renderHook, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import calendarAPi from '../../src/api/calendarApi';
import { useAuthStore } from '../../src/hooks';
import { authSlice } from '../../src/store';
import { initalState, notAuthenticatedState } from '../fixures/auth.fixures';
import { testUserCredentials } from '../fixures/testUser.fixure';

const getMockStore = (mockInitialstate) => {
  return configureStore({
    reducer: {
      auth: authSlice.reducer,
    },
    preloadedState: {
      auth: { ...mockInitialstate },
    },
  });
};

describe('useAuthStore', () => {
  beforeEach(() => localStorage.clear());

  test('should return default values', () => {
    const mockStore = getMockStore(initalState);

    const { result } = renderHook(useAuthStore, {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    expect(result.current).toEqual({
      status: 'not-authorize',
      user: {},
      errorMessage: undefined,
      startLogin: expect.any(Function),
      startRegister: expect.any(Function),
      checkAuthToken: expect.any(Function),
      startLogOut: expect.any(Function),
    });
  });

  test('should startLogin correctly', async () => {
    const fakeUser = testUserCredentials;
    const mockStore = getMockStore(notAuthenticatedState);
    const { result } = renderHook(useAuthStore, {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    const { startLogin } = result.current;

    await act(async () => {
      await startLogin(fakeUser);
    });

    const { errorMessage, status, user } = result.current;
    expect(status).toEqual('athenticated');
    expect(errorMessage).toEqual(undefined);
    expect(user).toEqual({ uid: fakeUser.uid, name: fakeUser.name });

    expect(localStorage.getItem('token')).toEqual(expect.any(String));
  });

  test('should startLogin must fail', async () => {
    const mockStore = getMockStore(notAuthenticatedState);
    const { result } = renderHook(useAuthStore, {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    const { status } = result.current;

    const { startLogin } = result.current;

    await act(async () => {
      await startLogin({ email: 'fail@gmail.com', password: '123pared' });
    });

    expect(status).toEqual(expect.any(String));
    expect(localStorage.getItem('token')).toEqual(null);

    await waitFor(() => expect(result.current.errorMessage).toBe(undefined));
  });

  test('should startRegister must fail', async () => {
    const newUser = {
      email: 'testUser2@Credentials.com',
      password: '123456',
      name: 'Arnold',
    };

    const mockStore = getMockStore(notAuthenticatedState);
    const { result } = renderHook(useAuthStore, {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    const { startRegister } = result.current;

    const spy = jest.spyOn(calendarAPi, 'post').mockReturnValue({
      data: {
        ok: true,
        uid: '123456',
        name: 'Test User 2',
        token: 'fake-token',
      },
    });
    await act(async () => {
      await startRegister(newUser);
    });

    const { status, user, errorMessage } = result.current;

    expect({ user, errorMessage, status }).toEqual({
      status: 'athenticated',
      user: { name: 'Test User 2', uid: '123456' },
      errorMessage: undefined,
    });

    //# Important #: borrar el spy para no generar conflictos o falsos negativos en los siguientes tests
    spy.mockRestore();
  });

  test('should startRegister must Fail', async () => {
    const mockStore = getMockStore(notAuthenticatedState);
    const { result } = renderHook(useAuthStore, {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    const { startRegister } = result.current;

    await act(async () => {
      await startRegister(testUserCredentials);
    });

    const { status, user, errorMessage } = result.current;

    expect({ user, errorMessage, status }).toEqual({
      status: 'not-authenticated',
      user: {},
      errorMessage: expect.any(String),
    });
  });

  test('should checkauthToken NO TOKEN', async () => {
    const mockStore = getMockStore(initalState);
    const { result } = renderHook(useAuthStore, {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });
    const { checkAuthToken } = result.current;

    await act(async () => {
      await checkAuthToken();
    });

    const { status, user, errorMessage } = result.current;

    expect({ status, user, errorMessage }).toEqual({
      status: 'not-authenticated',
      user: {},
      errorMessage: undefined,
    });
  });

  test('should checkauthToken ok authenticated user whit valid token', async () => {
    const { data } = await calendarAPi.post('/auth', testUserCredentials);

    localStorage.setItem('token', data.token);

    const mockStore = getMockStore(initalState);
    const { result } = renderHook(useAuthStore, {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });
    const { checkAuthToken } = result.current;

    await act(async () => {
      await checkAuthToken();
    });

    const { status, user, errorMessage } = result.current;

    expect({ status, user, errorMessage }).toEqual({
      status: 'athenticated',
      user: {
        name: 'Test User Credentials',
        uid: '63ca768f71d4631891395664',
      },
      errorMessage: undefined,
    });
  });
});
