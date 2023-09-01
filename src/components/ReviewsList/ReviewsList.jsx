import css from './ReviewsList.module.css';
import ReviewsItem from '../ReviewsItem/ReviewsItem';
import PropTypes from 'prop-types';

function ReviewsList({ reviews }) {
  return (
    <ul className={css.wrap}>
      {reviews.length > 0 ? (
        reviews.map(review => <ReviewsItem key={review.id} review={review} />)
      ) : (
        <div className={css.wrap}>
          <p className={css.reviews_not}>Unfortunately there are no reviews.</p>
        </div>
      )}
    </ul>
  );
}
ReviewsList.propTypes = {
  reviews: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    })
  ).isRequired,
};
export default ReviewsList;
