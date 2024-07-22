import { createBrowserRouter, Navigate } from 'react-router-dom';
import { NotFound } from '../components/not-found/not-found';
import { Error } from '../components/error/error';
import { PublicLayout } from '../layout/public/public-layout';
import { Login } from '../components/public/login/login';


export const router = createBrowserRouter([
    {
        path: '',
        errorElement: <Error />,
        children: [
            {
                path: '',
                element: <Navigate to='login' />
            },
            {
                path: '',
                element: <PublicLayout />,
                children: [
                    {
                        path: 'login',
                        element: <Login />
                    }
                ]
            }
        ]
    },
    {
        path: '*',
        element: <NotFound />
    }
]);
