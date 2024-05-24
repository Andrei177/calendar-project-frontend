import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { RoutesNames } from "../router/router";
import { useAuth } from "../store/useAuth";
import { useUser } from "../store/useUser";
import icon from "../assets/icon-white.svg";

const Navbar: FC = () => {
  const navigate = useNavigate();
  const {isAuth, setIsAuth} = useAuth();
  const {email} = useUser();

  const goExit = () => {
    setIsAuth(false);
    localStorage.removeItem("token");
  } 

  return (
    <div className="navbar">
        <div className="container">
          <ul className="navbar-list">
            <li><img src={icon} alt="пригласительное" style={{height: 25, width: 25}}/></li>
              {
              isAuth
              ?<li>
                <ul style={{display: "flex", gap: 5, listStyleType: "none"}}>
                {
                  email.length > 15
                  ?<li className="navbar-list__item">{email.substring(0, 15)}...</li>
                  :<li className="navbar-list__item">{email}</li>
                }
                  <li className="navbar-list__item" onClick={goExit}>Выйти</li>
                </ul>
              </li>
              :<li className="navbar-list__item" onClick={() => navigate(RoutesNames.LOGIN)}>Логин</li>
              }
          </ul>
        </div>
    </div>
  )
}

export default Navbar