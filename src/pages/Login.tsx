import { FC, useEffect, useState } from 'react'
import { useLogin } from '../store/useLogin'
import { useAuth } from '../store/useAuth';

const Login: FC = () => {

  const {userName, password, setUserName, setPassword} = useLogin();
  const setIsAuth = useAuth(state => state.setIsAuth);
  const [isRegistration, setIsRegistration] = useState<boolean>(true);

  const [isCorrect, setIsCorrect] = useState<boolean>(true);

  useEffect(() => {
    if(password.length < 7 && password.length){
      setIsCorrect(false);
    }
    else setIsCorrect(true);
  }, [password])

  return (
      <div className='login-form'>
        <h2 className='login-title'>{isRegistration ? "Регистрация" : "Авторизация"}</h2>
        <input
        type="text"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        placeholder='Имя пользователя'
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
          !isCorrect && <p style={{position: "absolute", bottom: 235}}>Пароль должен содержать больше 6 символов</p>
        }
        <input
        type="button"
        disabled={!isCorrect || userName.length === 0 || password.length === 0}
        value={isRegistration ? "Зарегистрироваться" : "Войти"}
        className='login-btn'
        onClick={() => setIsAuth(true)}
        style={{opacity: !isCorrect || userName.length === 0 || password.length === 0 ? 0.5 : 1}}
        />
        <div style={{textAlign: "center"}}>
          <h3>{isRegistration ? "Есть аккаунт?" : "Нет аккаунта?"}</h3>
          <p style={{textDecoration: 'underline', cursor: 'pointer'}} onClick={() => setIsRegistration(!isRegistration)}>{isRegistration ? "Авторизация" : "Регистрация"}</p>
        </div>
      </div>
  )
}

export default Login
