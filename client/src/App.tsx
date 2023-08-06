import Header from './components/Header/Header';
import AddInsurancePage from './pages/AddInsurancePage';
import InsuranceListPage from './pages/InsuranceListPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ROUTES } from './routes';
import { Provider } from 'react-redux';
import { store } from './store/store';

const App = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path={ROUTES.ADD_INSURANCE} element={<AddInsurancePage />} />
        <Route path={ROUTES.INSURANCE_LIST} element={<InsuranceListPage />} />
      </Routes>
    </BrowserRouter>
  );
};

const AppWrapper = (): JSX.Element => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default AppWrapper;
