/* ---------- External ---------- */
import { Navigate, type RouteObject } from 'react-router-dom';

/* ---------- Components ---------- */
import { Categories } from '_components/Categories';
import { Error } from '_components/Error';
import { Home } from '_components/Home';
import { ProtectedRoute } from '_components/Auth/ProtectedRoute';

/* ---------- Constants ---------- */
const private_routes_array: RouteObject[] = [
  {
    element: <ProtectedRoute />,
    children: [
      { path: '/', element: <Home />, errorElement: <Error /> },
      { path: '/categories', element: <Categories />, errorElement: <Error /> },
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
];

export const private_routes = (): RouteObject => {
  return {
    children: private_routes_array,
  };
};
