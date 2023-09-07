import { Link } from 'react-router-dom';
import css from './Header.module.css';
import React from 'react';
import { useSelector } from 'react-redux';
import { LiaAddressBookSolid } from 'react-icons/lia';
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
        <Link to="/">
          <div className={css.logo}>
            <span className={css.logo_name}>Phonebook</span>
            <LiaAddressBookSolid className={css.icon_film} />
          </div>
        </Link>
        <div>
          <p>{userName}</p>
          <button onClick={handleLogout}>Log out</button>
        </div>
      </header>
    </Container>
  );
}
