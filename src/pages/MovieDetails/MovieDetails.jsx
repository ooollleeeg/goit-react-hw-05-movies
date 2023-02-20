import { useState, useEffect, Suspense } from 'react';
import { useParams, Outlet, Link, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Loader } from 'components/Loader/Loader';
import { BsArrowLeftCircleFill } from 'react-icons/bs';
import movieAPI from 'services/movie-api';
import css from './MovieDetails.module.css';

const MovieDetails = () => {
    const { movieId } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(false);
    const location = useLocation();

    const BASE_IMG_URL = 'https://image.tmdb.org/t/p/w500';
    
    useEffect(() => {
        setLoading(true);
        movieAPI
            .fetchMovieDetails(movieId)
            .then(result => setMovie(result))
            .catch(error => toast.error(`${error.message}`))
            .finally(() => { setLoading(false) });
    }, [movieId]);

    return (
        <>
            {movie &&
                <div className={css.movieDetails}>
                    <Link to={location.state?.from ?? '/movies'} className={css.goBackBtn}>
                        <BsArrowLeftCircleFill className={css.backArrow} />
                        Go back
                    </Link>
                    <div className={css.basicInfo}>
                        <img
                            src={`${BASE_IMG_URL}${movie.poster_path}`}
                            alt={movie.title}
                            width='280'
                        />
                        <div className={css.movieInfo}>
                            <h2 className={css.name}>{movie.title} ({movie.release_date.slice(0, 4)})</h2>
                            <p className={css.description}>User Score:</p>
                            <h3 className={css.title}>Overview</h3>
                            <p className={css.description}>{movie.overview}</p>
                            <h4 className={css.title}>Genres</h4>
                            <p className={css.description}>{movie.genres.map(genre => { return `${genre.name} ` })}</p>
                        </div>
                    </div>
                    <div className={css.additionalInfo}>
                        <h5 className={css.secondaryTitle}>Additional Information:</h5>
                        <Link
                            to={`/movies/${movie.id}/cast`}
                            className={css.link}
                            state={{ from: location.state?.from ?? '/movies' }}
                        >
                            Cast
                        </Link>
                        <Link
                            to={`/movies/${movie.id}/reviews`}
                            className={css.link}
                            state={{ from: location.state?.from ?? '/movies' }}
                        >
                            Reviews
                        </Link>
                    </div>
                    <Suspense fallback={<Loader />}>
                        <Outlet />
                    </Suspense>
                </div>
            }
            {loading && <Loader />}
        </>
    )
};

export default MovieDetails;