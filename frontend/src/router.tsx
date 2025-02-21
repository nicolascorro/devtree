import { BrowserRouter, Routes, Route } from 'react-router-dom'

import LoginView from './views/LoginView'
import RegisterView from './views/RegisterView'
import AuthLayout from './layouts/AuthLayout'
import AppLayout from './layouts/AppLayout'
import ProfileView from './views/ProfileView'
import LinkTreeView from './views/LinkTreeView'

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
                <Route path='/admin' element={<AppLayout/>}>
                    <Route index={true} element={<LinkTreeView />}/>
                    <Route path='profile' element={<ProfileView />}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}