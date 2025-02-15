import LoginView from './views/LoginView'
import RegisterView from './views/RegisterView'
import AuthLayout from './layouts/AuthLayout'

import { BrowserRouter, Routes, Route } from 'react-router-dom'

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Route Father */}
                <Route element={<AuthLayout/>}>
                    {/* Route Sons */}
                    <Route path='auth/login' element={<LoginView />} />
                    <Route path='auth/register' element={<RegisterView />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}