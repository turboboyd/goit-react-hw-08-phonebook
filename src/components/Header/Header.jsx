import { Link } from 'react-router-dom';
import css from './Header.module.css';
import React from 'react';
import {StyledLink} from './Header.styled.js';
import { BsFilm } from 'react-icons/bs';

export default function Header() {
  return (
    <header className={css.header}>
      <Link to="/">
        <div className={css.logo}>
          <span className={css.logo_name}>WATCH</span>
          <BsFilm className={css.icon_film} />
        </div>
      </Link>
      <nav className={css.nav_menu}>
        <StyledLink className={css.nav_link} to="/">
          Home
        </StyledLink>
        <StyledLink className={css.nav_link} to="/movies">
          Movies
        </StyledLink>
      </nav>
    </header>
  );
}
