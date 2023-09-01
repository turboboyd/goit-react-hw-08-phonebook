import PropTypes from 'prop-types';
import YouTube from 'react-youtube';
import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { fetchDetails } from '../../Service/Service';
import css from './Trailer.module.css';

export default function Trailer() {
  const { movieId } = useParams();
  const [trailer, setTrailer] = useState([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  useEffect(() => {
    if (!movieId) {
      return;
    }

    async function fetchData() {
      try {
        const { results: queryResults } = await fetchDetails(movieId, 'videos');
        setTrailer(queryResults);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, [movieId]);

  const handleNextVideo = () => {
    setCurrentVideoIndex(prevIndex =>
      prevIndex === trailer.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevVideo = () => {
    setCurrentVideoIndex(prevIndex =>
      prevIndex === 0 ? trailer.length - 1 : prevIndex - 1
    );
  };

  const currentVideo = trailer[currentVideoIndex];

  const youtubeOpts = {
    height: '600px',
    width: '100%',
    playerVars: {
      autoplay: 0,
    },
  };

  return (
    <>
      {trailer.length > 0 && currentVideo ? (
        <div className={css.wrap}>
          <h2>{currentVideo.name}</h2>
          <p>{currentVideo.type}</p>
          <YouTube
            className={css.you_tube}
            videoId={currentVideo.key}
            opts={youtubeOpts}
          />
          <ul className={css.list_btn}>
            <li>
              <span className={css.btn} onClick={handlePrevVideo}>
                Previous
              </span>
            </li>
            <span className={css.btn} onClick={handleNextVideo}>
              Next
            </span>
          </ul>
        </div>
      ) : (
        <p className={css.text}>Sorry, no trailer.</p>
      )}
    </>
  );
}

Trailer.propTypes = {
  movieId: PropTypes.number,
};
