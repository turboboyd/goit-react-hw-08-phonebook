import { useState, useEffect } from 'react';
import { fetchTrending } from '../../Service/Service';
import LoadMoreBtn from 'components/LoadMore/LoadMoreBtn';
import Gallery from 'components/GalleryFilm/GalleryFilm';
import Loader from 'components/Loader/Loader';
import ScrollToTopButton from 'components/ScrollToTopButton/ScrollToTopButton';

export default function Home() {
  const [trending, setTrending] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [showLoadMore, setShowLoadMore] = useState(false);

  useEffect(() => {
    setShowLoadMore(false);
    setIsLoading(true);
    async function fetchData() {
      const trendingData = await fetchTrending(page);
      setTrending(prev => [...prev, ...trendingData.results]);
      setIsLoading(false);
      if (page >= trendingData.total_pages) {
        return;
      }
      setShowLoadMore(true);
    }
    fetchData();
  }, [page]);

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <>
      <Gallery queryFilm={trending} />
      {showLoadMore && (
        <LoadMoreBtn handleLoadMore={handleLoadMore} disabled={isLoading} />
      )}
      {isLoading && <Loader />}
      <ScrollToTopButton />
    </>
  );
}
