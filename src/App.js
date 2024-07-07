import React from "react";

import { RouterProvider, useRouteError } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import { MainPage } from "./MainPage";
import { WalletPage } from "./WalletPage";

const ThrowDataApiRouterError = () => {
  const error = useRouteError()
  throw error
}

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ThrowDataApiRouterError />,
    children: [
      { index: true, element: <MainPage /> },
      {
        path: '/wallet',
        element: (
          <WalletPage />
        ),
      },
    ],
  },
  { path: "*", element: <div>No such page</div> },
])

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
