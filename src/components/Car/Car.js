import React from 'react';
import {useNavigate} from "react-router-dom";

import css from "./car.module.css";
import {baseURL} from '../../config'

const Car = ({car}) => {
    const navigate = useNavigate();
    const {id, brand, price, year, photos} = car;

    return (

        <div className={css.carCard}>

            <div className={css.carImgBlock}>
                <div className={css.carImg}>
                    <img src={`${baseURL}${photos[0]}`} alt={brand}/>
                </div>
            </div>

            <div className={css.carDescription}>
                <h3>{id}. {brand}</h3>
                <h3>Year: {year}</h3>
                <h3>Price: {price}</h3>
            </div>
            <button onClick={() => {
                navigate(`/cars/detail/${id}`)
            }}>Detail
            </button>
        </div>
    );
};

export {Car};