import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = '69fc77f6620d7e54166b698911b2babb';
const TRENDING = '/trending/movie/day';
const MOVIE_DETAILS = '/movie';
const CAST = '/credits';
const REVIEWS = '/reviews';
const SEARCH = '/search/movie';

async function fetchTrending() {
    try {
        const fetchUrl = `${ BASE_URL }${TRENDING}?api_key=${API_KEY}`;
        const response = await axios.get(fetchUrl);

        if (response) {
            return response.data.results;
        }

        return Promise.reject(
            new Error('Oops! Something went wrong...')
        );
    } catch (error) {
        return error;
    }
};

async function fetchMovieDetails(id) {
    try {
        const fetchUrl = `${ BASE_URL }${MOVIE_DETAILS}/${id}?api_key=${API_KEY}`;
        const response = await axios.get(fetchUrl);

        if (response) {
            return response.data;
        }

        return Promise.reject(
            new Error('Oops! Something went wrong...')
        );
    } catch (error) {
        return error;
    }
};

async function fetchCast(id) {
    try {
        const fetchUrl = `${ BASE_URL }${MOVIE_DETAILS}/${id}${CAST}?api_key=${API_KEY}`;
        const response = await axios.get(fetchUrl);

        if (response) {
            return response.data;
        }

        return Promise.reject(
            new Error('Oops! Something went wrong...')
        );
    } catch (error) {
        return error;
    }
};

async function fetchReviews(id) {
    try {
        const fetchUrl = `${ BASE_URL }${MOVIE_DETAILS}/${id}${REVIEWS}?api_key=${API_KEY}`;
        const response = await axios.get(fetchUrl);

        if (response) {
            return response.data;
        }

        return Promise.reject(
            new Error('Oops! Something went wrong...')
        );
    } catch (error) {
        return error;
    }
};

async function searchMovies(query) {
    try {
        const fetchUrl = `${ BASE_URL }${SEARCH}?api_key=${API_KEY}&query=${query}`;
        const response = await axios.get(fetchUrl);

        if (response) {
            return response.data;
        }

        return Promise.reject(
            new Error('Oops! Something went wrong...')
        );
    } catch (error) {
        return error;
    }
}

const movieAPI = {
    fetchTrending,
    fetchMovieDetails,
    fetchCast,
    fetchReviews,
    searchMovies,
};

export default movieAPI;