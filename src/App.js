import React from 'react';

import { Navigate, RouterProvider, useRouteError } from 'react-router';
import { createBrowserRouter } from 'react-router-dom';
import { WalletPage } from './WalletPage';

const ThrowDataApiRouterError = () => {
  const error = useRouteError();
  throw error;
};

const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <ThrowDataApiRouterError />,
    children: [
      { index: true, element: <Navigate to={'/wallet'} /> },
      {
        path: '/wallet',
        element: <WalletPage />,
      },
    ],
  },
  { path: '*', element: <div>No such page</div> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
