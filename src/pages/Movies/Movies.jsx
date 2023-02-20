import { useState, useEffect, Suspense } from 'react';
import { Outlet, useLocation, useSearchParams } from 'react-router-dom';
import { BsSearch } from 'react-icons/bs';
import { toast } from 'react-toastify';
import { Loader } from 'components/Loader/Loader';
import movieAPI from 'services/movie-api';
import ListItem from 'components/ListItem/ListItem';
import css from './Movies.module.css';

const Movies = () => {
    const location = useLocation();
    const [value, setValue] = useState('');
    const [movies, setMovies] = useState(null);
    const [loading, setLoading] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get('query') ?? '';

    const handleInputChange = event => {
        const inputValue = event.currentTarget.value.toLowerCase();
        setValue(inputValue);
    };

    const handleFormSubmit = event => {
        event.preventDefault();
        if (value.trim() === '') {
            toast.error('Enter search query.');
            reset();
            return;
        }
        changeQuery(value);
        reset();
    };

    const changeQuery = value => {
        setSearchParams(value !== '' ? { query: value } : {});
    }

    const reset = () => {
        setValue('');
    };

    useEffect(() => {
        if (!query) {
            return;
        }

        setLoading(true);
        movieAPI
            .searchMovies(query)
            .then(result => {
                if (result.results.length > 0) {
                    setMovies(result.results);
                } else {
                    setMovies(null);
                    toast.warning("No matches found.");
                }
            })
            .catch(error => toast.error(`${error.message}`))
            .finally(() => {
                setLoading(false);
            });
    }, [query]);

    useEffect(() => {
        if (location.pathname === '/movies') {
            setMovies(null);
        }
    }, [location])

    return (
        <>
            {location.pathname === '/movies' &&
                <>
                    <form className={css.searchForm} onSubmit={handleFormSubmit}>
                        <input
                            type="text"
                            name="query"
                            placeholder="Enter movie name"
                            className={css.input}
                            onChange={handleInputChange}
                            value={value}
                        />
                        <button type="submit" className={css.button}>
                            <BsSearch className={css.buttonIcon} />
                            Search
                        </button>
                    </form>
                    <ul className={css.trending__list}>
                        {movies && movies.map(movie => {
                            return <ListItem
                                key={movie.id}
                                name={movie.title}
                                id={movie.id}
                            />
                        })}
                        {loading && <Loader />}
                    </ul>
                </>
            }
            <Suspense fallback={<Loader />}>
                <Outlet />
            </Suspense>
        </>
    );
};

export default Movies;