import React from 'react';
import ReactDOM from 'react-dom/client';
import './style/style.scss';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainPage from "./components/pages/MainPage";
import ErrorMessage from "./components/errorMessage/ErrorMessage";
import App from './components/app/App';
import ComicsPage from "./components/pages/ComicsPage";
import NotFoundPage from "./components/pages/404";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <ErrorMessage />,
        children: [
            {
                path: '/',
                element: <MainPage />,
            },
            {
                path: '/comics',
                element: <ComicsPage />,
            },
            {
                path: '*',
                element: <NotFoundPage />
            }
        ]
    }
]);

ReactDOM
    .createRoot(document.getElementById('root'))
    .render(
        <React.StrictMode>
            <RouterProvider router={router} />
        </React.StrictMode>,
    );

