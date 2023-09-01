import React from 'react';
import { CgProfile } from 'react-icons/cg';
import PropTypes from 'prop-types';
import css from './ActorInfo.module.css';
import Loader from 'components/Loader/Loader';

export default function ActorInfo({ actor }) {
  if (!actor) {
    return (
     <Loader/>
    );
  }

  const { profile_path, name, birthday, biography } = actor;

  return (
    <div>
      <h2 className={css.title}>Actor Information</h2>
      <div className={css.actor_wrap}>
        <div className={css.details}>
          {profile_path ? (
            <img
              className={css.actor_profile_img}
              src={`https://image.tmdb.org/t/p/w300${profile_path}`}
              alt={`${name} profile`}
            />
          ) : (
            <CgProfile size={100} color="white" />
          )}
          <h2 className={css.details_text}>{name}</h2>
        </div>
        <div>
          <p className={css.details_text}>Birthdate: {birthday}</p>
          <p className={css.details_text}>Biography: {biography}</p>
        </div>
      </div>
    </div>
  );
}

ActorInfo.propTypes = {
  actor: PropTypes.shape({
    profile_path: PropTypes.string,
    name: PropTypes.string.isRequired,
    birthday: PropTypes.string,
    biography: PropTypes.string,
  }),
};
