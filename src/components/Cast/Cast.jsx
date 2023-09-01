import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { fetchDetails } from '../../Service/Service';
import css from './Сast.module.css';
import { CgProfile } from 'react-icons/cg';
import Modal from '../Modal/Modal';
import { useNavigate } from 'react-router-dom';
import Actor from '../Actor/Actor';

export default function Cast() {
  const navigate = useNavigate();
  const { movieId, actorId } = useParams();
  const [casts, setCasts] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!movieId) {
      return;
    }

    async function fetchData() {
      try {
        const queryData = await fetchDetails(movieId, 'credits');
        setCasts(queryData.cast);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();

    if (actorId) {
      setShowModal(true);
    }
  }, [movieId, actorId]);

  const openModal = actorId => {
    navigate(`/movies/${movieId}/cast/${actorId}`);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    navigate(`/movies/${movieId}/cast`);
  };

  return (
    <>
      {casts.length === 0 ? (
        <p className={css.text}>Sorry, no information available.</p>
      ) : (
        <ul className={css.wrap}>
          {casts.map(({ id, profile_path, name, character }) => (
            <li className={css.card} key={id} onClick={() => openModal(id)}>
              {profile_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w500${profile_path}`}
                  alt={name}
                  width="150"
                  loading="lazy"
                />
              ) : (
                <CgProfile size={100} color="white" />
              )}
              <div className={css.news_card__text_wrapper}>
                <div className={css.news_card__top_text}>
                  <h2 className={css.actor}>{name}</h2>
                  <span className={css.rating}>{character}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
      {showModal && (
        <Modal actorId={parseInt(movieId)} onClose={closeModal}>
          <Actor />
        </Modal>
      )}
    </>
  );
}

Cast.propTypes = {
  movieId: PropTypes.string,
};
