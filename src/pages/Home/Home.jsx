import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Loader } from 'components/Loader/Loader';
import movieAPI from 'services/movie-api';
import ListItem from 'components/ListItem/ListItem';
import css from './Home.module.css';

const Home = () => {
    const [trending, setTrending] = useState(null);
    const [loading, setLoading] = useState(false);

    const generateTrendingList = () => {
        movieAPI
            .fetchTrending()
            .then(movies => setTrending(movies))
            .catch(error => toast.error(`${error.message}`))
            .finally(() => { setLoading(false) });
    };

    useEffect(() => {
        setLoading(true);
        generateTrendingList();
    }, []);

    return (
        <section className={css.trending}>
            <h2 className={css.trending__header}>Trending today</h2>
            <ul className={css.trending__list}>
                {trending && trending.map(movie => {
                    return <ListItem
                        key={movie.id}
                        name={movie.title}
                        id={movie.id}
                    />
                })}
                {loading && <Loader />}
            </ul>
        </section>
    )
};

export default Home;