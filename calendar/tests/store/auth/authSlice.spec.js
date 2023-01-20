import {
  authSlice,
  clearErrorMessage,
  onLogin,
  onLogut,
} from '../../../src/store/auth/authSlice';
import {
  athenticatedState,
  initalState,
  notAuthenticatedState,
} from '../../fixures/auth.fixures';
import { testUserCredentials } from '../../fixures/testUser.fixure';

describe('AuthSlice', () => {
  test('should return default state', () => {
    expect(authSlice.getInitialState()).toEqual(initalState);
  });

  test('should match login', () => {
    const state = authSlice.reducer(initalState, onLogin(testUserCredentials));

    expect(state).toEqual({
      status: 'athenticated',
      user: testUserCredentials,
      errorMessage: undefined,
    });
  });

  test('should match logout', () => {
    const state = authSlice.reducer(athenticatedState, onLogut());

    expect(state).toEqual({
      status: 'not-authenticated',
      user: {},
      errorMessage: undefined,
    });
  });

  test('should match logout with errorMessage', () => {
    const state = authSlice.reducer(athenticatedState, onLogut('Server Error'));

    expect(state).toEqual({
      status: 'not-authenticated',
      user: {},
      errorMessage: 'Server Error',
    });
  });

  test('should clear errorMessage', () => {
    const state = authSlice.reducer(
      { ...notAuthenticatedState, errorMessage: 'Server Error' },
      clearErrorMessage()
    );
    expect(state).toEqual({
      status: 'not-authenticated',
      user: {},
      errorMessage: '',
    });
  });
});
