import css from './Header.module.css';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectUserName } from 'redux/auch';
import { useDispatch } from 'react-redux';
import { logOut } from '../../redux/auch';
import { Container } from 'components/Сontainer/Container';

export default function Header() {
  const dispatch = useDispatch();
  const userName = useSelector(selectUserName);
  
  const handleLogout = () => {
    dispatch(logOut());
  };

  return (
    <Container>
      <header className={css.header}>
        <div className={css.wrapper_login}>
          <p className={css.userName}>{userName}</p>
          <button className={css.button} onClick={handleLogout}>
            Log out
          </button>
        </div>
      </header>
    </Container>
  );
}
