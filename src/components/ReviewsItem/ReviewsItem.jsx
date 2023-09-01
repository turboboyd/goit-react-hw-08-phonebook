
import { CgProfile } from 'react-icons/cg';
import formatDateTime from './data';
import css from './ReviewsItem.module.css';
import PropTypes from 'prop-types';

function ReviewsItem({ review }) {
  const {
    id,
    author_details: { name, avatar_path, rating },
    created_at,
    content,
  } = review;

  return (
    <li key={id}>
      <div className={css.card}>
        <h3 className={css.author}>{name}</h3>
        {avatar_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w500${avatar_path}`}
            alt={name}
            width="150"
            loading="lazy"
          />
        ) : (
          <CgProfile size={50} color="white" />
        )}
        <p>
          User Rating: <span>{rating}</span>
        </p>
        <p>
          <span>{formatDateTime(created_at)}</span>
        </p>
      </div>
      <p className={css.text}>{content}</p>
    </li>
  );
}


ReviewsItem.propTypes = {
  review: PropTypes.shape({
    id: PropTypes.string.isRequired,
    author_details: PropTypes.shape({
      name: PropTypes.string.isRequired,
      avatar_path: PropTypes.string,
      rating: PropTypes.number.isRequired,
    }).isRequired,
    created_at: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  }).isRequired,
};

export default ReviewsItem;
