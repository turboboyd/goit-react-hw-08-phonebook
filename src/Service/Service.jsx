const fetch = require('node-fetch');
const API_KEY =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZjhjMTAyMDI0MDIyNTYxMDc5NjhmY2NiODcwZGE2MSIsInN1YiI6IjY0ZDNjYjdlZGQ5MjZhMDFlNzMyN2JhMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.B6ar64KXg9EGEEntonw5miWhTgtZbhfpHsRZyrME33s';

const startUrl = 'https://api.themoviedb.org/3/';
const language = `language=en-US`;
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  },
};

export async function fetchTrending(page) {
  const url = `${startUrl}trending/movie/day?${language}&page=${page}`;
  try {
    const response = await fetch(url, options);
    const json = await response.json();
    return json;
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    return [];
  }
}

export async function fetchSearch(query, page) {
  const encodedQuery = encodeURIComponent(query);
  const url = `${startUrl}search/movie?include_adult=false&${language}&page=${page}&query=${encodedQuery}`;

  try {
    const response = await fetch(url, options);
    const json = await response.json();
    return json;
  } catch (error) {
    console.error('Error searching movies:', error);
    return [];
  }
}

export async function fetchDetailsKino(id) {
  const url = `${startUrl}movie/${id}?${language}`;

  try {
    const response = await fetch(url, options);
    const json = await response.json();
    return json;
  } catch (error) {
    console.error('Error searching movies:', error);
    return [];
  }
}

export async function fetchDetails(id, name) {
  const url = `${startUrl}movie/${id}/${name}?${language}`;

  try {
    const response = await fetch(url, options);
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getActorsInfo(id) {
  const url = `${startUrl}person/${id}?language=en-US`;

  try {
    const response = await fetch(url, options);
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getActorsMovieInfo(id) {
  const url = `${startUrl}person/${id}/movie_credits`;

  try {
    const response = await fetch(url, options);
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
    return null;
  }
}
