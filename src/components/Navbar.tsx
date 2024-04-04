import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { RoutesNames } from "../router/router";
import { useAuth } from "../store/useAuth";
import { useLogin } from "../store/useLogin";

const Navbar: FC = () => {
  const navigate = useNavigate();
  const {isAuth, setIsAuth} = useAuth();
  const userName = useLogin(state => state.userName);
  return (
    <div className="navbar">
        <div className="container">
            {
            isAuth
            ?<ul className="navbar-list">
                {
                  userName.length > 15
                  ?<li className="navbar-list__item">{userName.substring(0, 15)}...</li>
                  :<li className="navbar-list__item">{userName}</li>
                }
                <li className="navbar-list__item" onClick={() => setIsAuth(false)}>Выйти</li>
            </ul>
            :<ul className="navbar-list">
                <li className="navbar-list__item" onClick={() => navigate(RoutesNames.LOGIN)}>Логин</li>
            </ul>
            }
        </div>
    </div>
  )
}

export default Navbar
