import { useState, useEffect } from 'react';
import { fetchSearch } from 'Service/Service';
import Search from '../../components/Search/Search';
import css from './Movies.module.css';
import LoadMoreBtn from 'components/LoadMore/LoadMoreBtn';
import GalleryFilm from 'components/GalleryFilm/GalleryFilm';
import Loader from 'components/Loader/Loader';
import PropTypes from 'prop-types';
import ScrollToTopButton from 'components/ScrollToTopButton/ScrollToTopButton';
import { useSearchParams } from 'react-router-dom';

export default function Movies() {
  const [queryFilm, setQueryFilm] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showLoadMore, setShowLoadMore] = useState(false);
  const isOnMoviesPage = true;

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query');

  const searchName = ({ searchName }) => {
    if (query === searchName) {
      return;
    }
    setSearchParams({ query: searchName });
    setQueryFilm([]);
    setPage(1);
  };

  useEffect(() => {
    if (!query) {
      return;
    }

    setShowLoadMore(false);

    async function fetchData() {
      try {
        setLoading(true);
        const queryFilmData = await fetchSearch(query, page);
        setQueryFilm(prevQueryFilm => [
          ...prevQueryFilm,
          ...queryFilmData.results,
        ]);
        setShowLoadMore(page < queryFilmData.total_pages);
      } catch (error) {
        console.error('An error occurred while fetching data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [query, page]);

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <>
      {!query && (
        <div className={css.wrap}>
          <h1 className={css.title}>Find your favourite movie</h1>
          <p className={css.text}>Search by title, character, or genre</p>
        </div>
      )}

      <Search searchName={searchName} />

      {query && (
        <div className={css.results_wrap}>
          <p className={css.results}>Search results for:</p>
          <h2 className={css.results_serch}>{query}</h2>
        </div>
      )}

      <GalleryFilm queryFilm={queryFilm} isOnMoviesPage={isOnMoviesPage} />
      {query && !loading && queryFilm.length === 0 && <p>Nothing found</p>}
      {showLoadMore && <LoadMoreBtn handleLoadMore={handleLoadMore} />}
      {loading && <Loader />}
      <ScrollToTopButton />
    </>
  );
}

Movies.propTypes = {
  queryFilm: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
    })
  ),
};
