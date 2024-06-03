import React from 'react';
import ReactDOM from 'react-dom/client';
import './style/style.scss';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainPage from "./components/pages/mainPage/MainPage";
import ErrorMessage from "./components/errorMessage/ErrorMessage";
import App from './components/app/App';
import ComicsPage from "./components/pages/comicPage/ComicsPage";
import NotFoundPage from "./components/pages/notFoundPage/NotFoundPage";
import SingleComicPage from "./components/pages/singleComicPage/SingleComicPage";

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
                path: '/comics/:comicId',
                element: <SingleComicPage />,
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

