import { createBrowserRouter, Navigate } from 'react-router-dom';
import { NotFound } from '../components/not-found/not-found';
import { Error } from '../components/error/error';
import { PublicLayout } from '../layout/public/public-layout';
import { Login } from '../components/public/login/login';
import { RegistrationChooser } from '../components/public/registration/registration-chooser/registration-chooser';
import { CompanyRegistrationOne } from '../components/public/registration/company-registration/registration-one/company-registration-one';
import { CompanyRegistrationTwo } from '../components/public/registration/company-registration/registration-two/company-registration-two';
import { CompanyRegistrationThree } from '../components/public/registration/company-registration/registration-three/company-registration-three';


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
                    },
                    {
                        path: 'registration-chooser',
                        element: <RegistrationChooser />
                    },
                    {
                        path: 'company-registration-one',
                        element: <CompanyRegistrationOne />
                    },
                    {
                        path: 'company-registration-two',
                        element: <CompanyRegistrationTwo />
                    },
                    {
                        path: 'company-registration-three',
                        element: <CompanyRegistrationThree />
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
