import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './layout/Layout';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  const HomePage = lazy(() => import('./pages/HomePage'));
  const RecipePage = lazy(() => import('./pages/RecipePage'));
  const UserPage = lazy(() => import('./pages/UserPage'));
  const AddRecipePage = lazy(() => import('./pages/AddRecipePage'));
  const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

  return (
    <>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
          </Route>
        </Route>

        <Route element={<PrivateRoute redirectTo="/" />}>
          <Route path="/" element={<Layout />}>
            <Route path="recipe/:recipeId" element={<RecipePage />} />
            <Route path="user/:id" element={<UserPage />} />
            <Route path="recipe/add" element={<AddRecipePage />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        theme="dark"
      />
    </>
  );
}
