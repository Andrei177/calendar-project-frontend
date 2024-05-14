import { FC, useEffect, useState } from 'react'
import { useUser } from '../store/useUser'
import { useAuth } from '../store/useAuth';
import { IUser } from '../models/IUser';
import { login, recovery, registration } from '../http/userAPI/userAPI';

const Login: FC = () => {

  const {email, password, setEmail, setPassword} = useUser();

  const setIsAuth = useAuth(state => state.setIsAuth);

  const [isRegistration, setIsRegistration] = useState<boolean>(true);

  const [isCorrect, setIsCorrect] = useState<boolean>(true);

  const [showRecoveryBtn, setShowRecoveryBtn] = useState<boolean>(false);

  useEffect(() => {
    if(password.length < 7 && password.length){
      setIsCorrect(false);
    }
    else setIsCorrect(true);
  }, [password])

  const recoveryPassword = () => {
    recovery(email)
    .then(res => alert(res.message))
    .catch(err => alert(err.response.message))
    setShowRecoveryBtn(false);
  }


  const authUser = () => {
    const user: IUser = {
      email,
      password
    }
    if(isRegistration){
      registration(user)
      .then(res => {
        console.log(res, "Ответ в компоненте Login при регистрации")
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
      })
      .catch(err => {
        alert(err.response.data.message);
        console.log(err, "ОШИБКА ПРИ ЛОГИНЕ");
      })
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
        {
          !isCorrect && <p  className="correct-message">Пароль должен содержать больше 6 символов</p>
        }
        <input
        type="button"
        disabled={!isCorrect || email.length === 0 || password.length === 0}
        value={isRegistration ? "Зарегистрироваться" : "Войти"}
        className='login-btn'
        onClick={authUser}
        style={{opacity: !isCorrect || email.length === 0 || password.length === 0 ? 0.5 : 1}}
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