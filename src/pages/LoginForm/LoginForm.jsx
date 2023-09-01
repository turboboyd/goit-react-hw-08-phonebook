import React, { useState } from 'react';
import css from './LoginForm.module.css';
import SignIn from 'components/SignIn/SignIn';
import SignUp from 'components/SignUp/SignUp';
import { useNavigate } from 'react-router-dom';


function Login() {
  const navigate = useNavigate();
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);

  const handleSignUpClick = () => {
    setIsRightPanelActive(true);
    navigate('/register');
  };

  const handleSignInClick = () => {
    setIsRightPanelActive(false);
    navigate('/login');
  };

  return (
    <div
      className={`${css.container} ${
        isRightPanelActive ? css['right-panel-active'] : ''
      }`}
    >
      <div className={`${css['form-container']} ${css['sign-in-container']}`}>
        <SignIn />
      </div>
      <div className={`${css['form-container']} ${css['sign-up-container']}`}>
        <SignUp />
      </div>
      <div className={css['overlay-container']}>
        <div className={css.overlay}>
          <div className={`${css['overlay-panel']} ${css['overlay-left']}`}>
            <h1>Welcome Back!</h1>
            <p>
              To keep connected with us, please login with your personal info
            </p>
            <button
              className={`${css.ghost} ${css.signIn}`}
              id="signIn"
              onClick={handleSignInClick}
            >
              Sign In
            </button>
          </div>
          <div className={`${css['overlay-panel']} ${css['overlay-right']}`}>
            <h1>Hello, Friend!</h1>
            <p>Enter your personal details and start the journey with us</p>
            <button
              className={`${css.ghost} ${css.signUp}`}
              id="signUp"
              onClick={handleSignUpClick}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
