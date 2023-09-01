import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { fetchDetails } from '../../Service/Service';
import ReviewsList from '../ReviewsList/ReviewsList';

export default function Reviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (!movieId) {
      return;
    }

    async function fetchData() {
      try {
        const { results: queryResults } = await fetchDetails(
          movieId,
          'reviews'
        );
        setReviews(queryResults);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, [movieId]);

  return <ReviewsList reviews={reviews} />;
}

Reviews.propTypes = {
  movieId: PropTypes.string,
};
