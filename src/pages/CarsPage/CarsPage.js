import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {carActions} from "../../redux";
import {Car} from "../../components";
import css from './carsPage.module.css'
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
            <div className={css.modelClass}>
                <div className={css.carType}>
                    <h4>Economy</h4>
                    <img src="https://7cars.com.ua/wp-content/uploads/2016/03/econom.jpg" alt="Economy"/>

                </div>

                <div className={css.carType}>
                    <h4>Middle</h4>
                    <img src="https://7cars.com.ua/wp-content/uploads/2016/03/middle.jpg" alt="Middle"/>
                </div>

                <div className={css.carType}>
                    <h4>Business</h4>
                    <img src="https://7cars.com.ua/wp-content/uploads/2016/03/business.jpg" alt="Business"/>
                </div>

                <div className={css.carType}>
                    <h4>Premium</h4>
                    <img src="https://7cars.com.ua/wp-content/uploads/2016/03/premium.jpg" alt="Premium"/>
                </div>

                <div className={css.carType}>
                    <h4>SUV</h4>
                    <img src="https://7cars.com.ua/wp-content/uploads/2016/03/offroad.jpg" alt="Off-road vehicle"/>
                </div>

                <div className={css.carType}>
                    <h4>Minivan</h4>
                    <img src="https://7cars.com.ua/wp-content/uploads/2016/03/middle.jpg" alt="minivan"/>
                </div>
            </div>
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