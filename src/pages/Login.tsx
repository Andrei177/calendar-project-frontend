import { FC, useEffect, useState } from 'react'
import { useUser } from '../store/useUser'
import { useAuth } from '../store/useAuth';
import { IUser } from '../models/IUser';
import { login, recovery, registration } from '../http/userAPI/userAPI';
import { useNavigate } from 'react-router-dom';
import { RoutesNames } from '../router/router';

const Login: FC = () => {

  const {email, password, setEmail, setPassword, id} = useUser();

  const setIsAuth = useAuth(state => state.setIsAuth);

  const [isRegistration, setIsRegistration] = useState<boolean>(true);

  const [isCorrectPassword, setIsCorrectPassword] = useState<boolean>(true);
  const [isCorrectEmail, setIsCorrectEmail] = useState<boolean>(true);

  const [showRecoveryBtn, setShowRecoveryBtn] = useState<boolean>(false);

  useEffect(() => {
    if(password.length < 7 && password.length){
      setIsCorrectPassword(false);
    }
    else setIsCorrectPassword(true);
    checkEmail();
  }, [password, email])

  const recoveryPassword = () => {
    recovery(email)
    .then(res => alert(res.message))
    .catch(err => alert(err.response.data.message))
    setShowRecoveryBtn(false);
  }

  const navigate = useNavigate();

  const authUser = () => {
    const user: IUser = {
      id,
      email,
      password
    }
    if(isRegistration){
      registration(user)
      .then(res => {
        console.log(res, "Ответ в компоненте Login при регистрации")
        navigate(RoutesNames.EVENT)
        setIsAuth(true)
      })
      .catch(err => {
        alert(err.response.data.message);
        console.log(err, "ОШИБКА ПРИ РЕГИСТРАЦИИ ПОЛЬЗОВАТЕЛЯ");
      })
    }else{
      login(user)
      .then(res => {
        console.log(res, "Ответ при логине");
        setIsAuth(true);
        navigate(RoutesNames.EVENT);
      })
      .catch(err => {
        alert(err.response.data.message);
        console.log(err, "ОШИБКА ПРИ ЛОГИНЕ");
      })
    }
  }

  const checkEmail = () => {
    if(!email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/) && email){
      setIsCorrectEmail(false);
    }
    else{
      setIsCorrectEmail(true);
    }
  }
  return (
      <div className='login-form'>
        <h2 className='login-title'>{isRegistration ? "Регистрация" : "Авторизация"}</h2>
        <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder='Адрес электронной почты'
        className='login-inp'
        />
        <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder='Пароль'
        className='login-inp'
        />
        {!isCorrectPassword && <p className="correct-message">Пароль должен содержать больше 6 символов</p>}
        {!isCorrectEmail && <p className="correct-message-email">Некорректный email</p>}
        <input
        type="button"
        disabled={!isCorrectPassword || !isCorrectEmail || email.length === 0 || password.length === 0}
        value={isRegistration ? "Зарегистрироваться" : "Войти"}
        className='login-btn'
        onClick={authUser}
        style={{opacity: !isCorrectPassword || !isCorrectEmail || email.length === 0 || password.length === 0 ? 0.5 : 1}}
        />
        <div style={{textAlign: "center"}}>
          <h3>{isRegistration ? "Есть аккаунт?" : "Нет аккаунта?"}</h3>
          <p style={{textDecoration: 'underline', cursor: 'pointer'}} onClick={() => setIsRegistration(!isRegistration)}>{isRegistration ? "Авторизация" : "Регистрация"}</p>
        </div>
        <div className={showRecoveryBtn?'hide':'forget-password'} onClick={() => setShowRecoveryBtn(true)}>Забыли пароль?</div>
        <button className={showRecoveryBtn?'login-btn':'hide'} onClick={recoveryPassword}>Выслать новый пароль</button>
      </div>
  )
}

export default Login