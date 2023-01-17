import React, { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import LoginPage from '../auth/pages/LoginPage/LoginPage';
import { CalendarPage } from '../calendar/pages';
import { useAuthStore } from '../hooks';

const AppRouter = () => {
  const { checkAuthToken, status } = useAuthStore();

  useEffect(() => {
    checkAuthToken();
  }, []);

  if (status === 'checking') {
    return <h1>Cargando...</h1>;
  }
  return (
    <Routes>
      {status === 'not-authenticated' ? (
        // when token doesn't exist route not exists too
        <>
          <Route path="/auth/*" element={<LoginPage />} />
          <Route path="/*" element={<Navigate to="/auth/login" />} />
        </>
      ) : (
        <>
          <Route path="/" element={<CalendarPage />} />
          <Route path="/*" element={<Navigate to="/" />} />
        </>
      )}
    </Routes>
  );
};

export default AppRouter;
