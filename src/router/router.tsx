import { createBrowserRouter } from 'react-router-dom';
import { NotFound } from '../components/not-found/not-found';
import { Error } from '../components/error/error';


export const router = createBrowserRouter([
    {
        path: '',
        errorElement: <Error />
    },
    {
        path: '*',
        element: <NotFound />
    }
]);
