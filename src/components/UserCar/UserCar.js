import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {autoParkActions, carActions} from "../../redux";
import {authService} from "../../services";
import {baseURL} from "../../config";
import css from './userCar.module.css'

const UserCar = ({car}) => {

    const {id, brand, year, price, photos} = car;
    const dispatch = useDispatch();

    const {autoParks, userCars} = useSelector(state => state.autoParks);

    useEffect(() => {
        dispatch(autoParkActions.getAllByUser())
    }, [dispatch, userCars]);



    useEffect(() => {
        dispatch(carActions.setStatusIsAuthenticated(authService.isAuthenticated()))
    }, [dispatch])
    return (
        <div className={css.carWrapper}>
            <h3>{id}. {brand}</h3>
            <h3>Year: {year}</h3>
            <h3>Price: {price}</h3>
            <button onClick={() => dispatch(carActions.setCarForUpdate(car))}>Update</button>
            <button onClick={() => dispatch(carActions.deleteCar({id}))}>Delete</button>

            <div className={css.carImageWrapper}>
                {!!photos.length &&
                    photos.map((photo, index) =>
                        <div key={index} className={css.carImage}>
                            <img src={`${baseURL}${photo}`} alt={brand}/>
                        </div>)
                }
            </div>

        </div>
    );
};

export {UserCar};