import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {carActions} from "../../redux";
import {Car} from "../../components";
import css from './carPage.module.css'
import {useSearchParams} from "react-router-dom";

const CarsPage = () => {

    const dispatch = useDispatch();
    const {cars, prevPage, nextPage} = useSelector(state => state.cars);
    const [query, setQuery] = useSearchParams({page: '1'});

    useEffect(() => {
        dispatch(carActions.getAll({page: query.get('page')}))
    }, [dispatch, query]);

    return (
        <div className={css.carWrapper}>
            <div className={css.carListBlock}>
                {
                    cars &&
                    cars.map(car => <Car key={car.id} car={car}/>)
                }</div>
            <div>
                <button disabled={!prevPage}
                        onClick={() => setQuery(query => ({page: +query.get('page') - 1}))}>PrevPage
                </button>
                <button disabled={!nextPage}
                        onClick={() => setQuery(query => ({page: +query.get('page') + 1}))}>NextPage
                </button>
            </div>
        </div>
    );
};

export {CarsPage};