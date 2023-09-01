import css from './Poster.module.css';
import PropTypes from 'prop-types';

export default function Poster({ imageUrl, altText, homepageLink }) {
  if (!homepageLink) {
    return (
      <img className={css.poster} src={imageUrl} alt={altText} loading="lazy" />
    );
  }
  return (
    <a href={homepageLink} target="_blank" rel="noopener noreferrer">
      <img className={css.poster} src={imageUrl} alt={altText} loading="lazy" />
    </a>
  );
}

Poster.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  altText: PropTypes.string.isRequired,
  homepageLink: PropTypes.string.isRequired,
};
