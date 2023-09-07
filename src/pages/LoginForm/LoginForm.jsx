import React, { useState, useEffect } from 'react';
import css from './LoginForm.module.css';
import SignIn from 'components/SignIn/SignIn';
import SignUp from 'components/SignUp/SignUp';
import { useNavigate, useLocation } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { selectStatus, selectError } from 'redux/auch';

import { toast } from 'react-toastify';

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);
  const status = useSelector(selectStatus);
  const error = useSelector(selectError);

  const handleSignUpClick = () => {
    setIsRightPanelActive(true);
    navigate('/register');
  };

  const handleSignInClick = () => {
    setIsRightPanelActive(false);
    navigate('/login');
  };

  useEffect(() => {
    if (location.pathname === '/register') {
      setIsRightPanelActive(true);
    } else if (location.pathname === '/login') {
      setIsRightPanelActive(false);
    }
  }, [location.pathname]);
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
            <h2 className={css.title}>Welcome Back!</h2>
            <p className={css.text}>
              To keep connected with us, please login with your personal info
            </p>
            <button
              className={`${css.button} ${css.ghost} ${css.signUp}`}
              id="signIn"
              onClick={handleSignInClick}
            >
              Sign In
            </button>
          </div>
          <div className={`${css['overlay-panel']} ${css['overlay-right']}`}>
            <h2 className={css.title}>Hello, Friend!</h2>
            <p className={css.text}>
              Enter your personal data to create a personal account
            </p>
            <button
              className={`${css.button} ${css.ghost} ${css.signUp}`}
              id="signUp"
              onClick={handleSignUpClick}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
      {status === 'rejected' && toast.error(`Error: ${error}`)}
    </div>
  );
}

export default Login;
