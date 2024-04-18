import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { RoutesNames } from "../router/router";
import { useAuth } from "../store/useAuth";
import { useUser } from "../store/useUser";

const Navbar: FC = () => {
  const navigate = useNavigate();
  const {isAuth, setIsAuth} = useAuth();
  const email = useUser(state => state.email);
  return (
    <div className="navbar">
        <div className="container">
            {
            isAuth
            ?<ul className="navbar-list">
                {
                  email.length > 15
                  ?<li className="navbar-list__item">{email.substring(0, 15)}...</li>
                  :<li className="navbar-list__item">{email}</li>
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
