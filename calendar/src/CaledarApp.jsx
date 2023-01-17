import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { getEnvVar } from './helpers/getEnvVar';
import { AppRouter } from './router';
import { store } from './store';

const CaledarApp = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </Provider>
  );
};

export default CaledarApp;
