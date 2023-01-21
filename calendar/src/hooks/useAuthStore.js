import { useSelector, useDispatch } from 'react-redux';
import calendarAPi from '../api/calendarApi';
import {
  clearErrorMessage,
  onChecking,
  onLogin,
  onLogOutCalendar,
  onLogut,
} from '../store';

//Alternative method thunks

export const useAuthStore = () => {
  const { status, user, errorMessage } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const startLogin = async ({ email, password }) => {
    dispatch(onChecking());

    try {
      const { data } = await calendarAPi.post('/auth', { email, password });

      localStorage.setItem('token', data.token);
      localStorage.setItem('token-init-date', new Date().getTime());

      dispatch(onLogin({ name: data.name, uid: data.uid }));
    } catch (error) {
      dispatch(onLogut(error.response.data?.msg || '--'));
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10);
    }
  };

  const startRegister = async ({ email, password, name }) => {
    dispatch(onChecking());
    try {
      const { data } = await calendarAPi.post('/auth/new', {
        email,
        password,
        name,
      });

      localStorage.setItem('token', data.token);
      localStorage.setItem('token-init-date', new Date().getTime());

      dispatch(onLogin({ name: data.name, uid: data.uid }));
    } catch (error) {
      dispatch(onLogut(error.response.data?.msg || '---'));
      setTimeout(() => {
        clearErrorMessage();
      }, 10);
    }
  };

  const checkAuthToken = async () => {
    const token = localStorage.getItem('token');
    if (!token) return dispatch(onLogut());

    try {
      const { data } = await calendarAPi.get('/auth/renew');

      localStorage.setItem('token', data.token);
      localStorage.setItem('token-init-date', new Date().getTime());
      dispatch(onLogin({ name: data.name, uid: data.uid }));
    } catch (error) {
      dispatch(onLogut(error.response.data?.msg || '---'));
      setTimeout(() => {
        clearErrorMessage();
      }, 10);
    }
  };

  const startLogOut = () => {
    localStorage.clear();
    dispatch(onLogOutCalendar());
    dispatch(onLogut());
  };

  return {
    status,
    user,
    errorMessage,

    //methods
    startLogin,
    startRegister,
    checkAuthToken,
    startLogOut,
  };
};
