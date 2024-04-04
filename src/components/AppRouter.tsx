import { FC } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { RoutesNames, privateRoutes, publicRoutes } from '../router/router'
import { useAuth } from '../store/useAuth';

const AppRouter: FC = () => {
    const isAuth = useAuth(state => state.isAuth);
  return (
    <div className='main'>
        {
            isAuth
            ?
            <Routes>
            {
                privateRoutes.map(route => 
                    <Route key={route.path} path={route.path} element={route.element} />
                )
            }
                <Route path='*' element={<Navigate to={RoutesNames.EVENT}/>}/>
            </Routes>
            :
            <Routes>
            {
                publicRoutes.map(route => 
                    <Route key={route.path} path={route.path} element={route.element} />
                )
            }
                <Route path='*' element={<Navigate to={RoutesNames.LOGIN}/>}/>
            </Routes>
        }
    </div>
  )
}

export default AppRouter
