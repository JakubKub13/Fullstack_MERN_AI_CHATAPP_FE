import { useState, useEffect } from 'react'
import { usePostLoginMutation, usePostSignUpMutation } from "@/state/api";
 
function Login({ setUser, setSecret }) {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [triggerLogin, resultLogin] = usePostLoginMutation();
  const [triggerSignUp] = usePostSignUpMutation();


  const handleLogin = () => {
    triggerLogin({ username, password });
  }

  const handleRegister = () => {
    triggerSignUp({ username, password });
  };

  useEffect(() => {
    if (resultLogin.data?.response) {
      setUsername(username);
      setPassword(password);
    }
  }, [resultLogin.data]); // eslint-disable-line

  return (
    <div className="login-page">
      <div className="login-container">
        <h2 className="title">A.I. powered Chat app</h2>
        <p className="register-change" onClick={() => setIsRegister(!isRegister)}>
          {isRegister ? 'Already have an account?' : 'Create an account'}
        </p>

        <div>
          <input 
            className="login-input" 
            type="text" 
            placeholder="user" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}  
          />
          <input 
            className="login-input" 
            type="secret" 
            placeholder="secret" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}  
          />
          
        </div>
        <div className="login-actions">
          {isRegister ? (
            <button type="button" onClick={handleRegister}>
              Register
            </button>
          ): (
            <button type="button" onClick={handleLogin}>
              Login
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Login