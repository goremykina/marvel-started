import React from 'react';
import ReactDOM from 'react-dom/client';
import './style/style.scss';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainPage from "./components/pages/MainPage";
import ErrorMessage from "./components/errorMessage/ErrorMessage";
import ComicsList from "./components/comicsList/ComicsList";
import App from './components/app/App';

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
                element: <ComicsList />,
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

