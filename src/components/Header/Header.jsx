import { Link } from 'react-router-dom';
import css from './Header.module.css';
import React from 'react';
import { useSelector } from 'react-redux';
import { BsFilm } from 'react-icons/bs';
import { selectUserName } from 'redux/auch';

export default function Header() {
  const userName = useSelector(selectUserName);
  console.log('userName: ', userName);
  return (
    <header className={css.header}>
      <Link to="/">
        <div className={css.logo}>
          <span className={css.logo_name}>WATCH</span>
          <BsFilm className={css.icon_film} />
        </div>
      </Link>
      <div>
        <p>{userName}</p>
      </div>
    </header>
  );
}
