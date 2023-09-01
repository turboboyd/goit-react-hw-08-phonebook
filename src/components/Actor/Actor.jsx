import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getActorsInfo, getActorsMovieInfo } from '../../Service/Service';
import Gallery from '../GalleryFilm/GalleryFilm';
import ActorInfo from '../ActorInfo/ActorInfo';
import Section from '../Section/Section';

export default function Actor() {
  const { actorId } = useParams();
  const [actor, setActor] = useState(null);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const queryData = await getActorsInfo(actorId);
        const queryDataMovies = await getActorsMovieInfo(actorId);

        setActor(queryData);
        setMovies(queryDataMovies.cast);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, [actorId]);

  return (
    <>
      <Section>
        <ActorInfo actor={actor} />
      </Section>
      <Section>
        <Gallery queryFilm={movies} />
      </Section>
    </>
  );
}
