import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import {OrderingCar} from "../OrderingCar/OrderingCar";
import {carActions} from "../../redux";
import css from "./carDetail.module.css";

const CarDetail = () => {

    const {id} = useParams();
    const dispatch = useDispatch();
    const {current_car} = useSelector(state => state.cars);

    useEffect(() => {
        dispatch(carActions.getById({id}))
    }, [dispatch, id]);

    return (
        <>
            {
                current_car &&
                <div className={css.carDetailWrapper}>
                    <div className={css.carImage}>
                        {current_car['photos'].map((photo, index) =>
                            <img key={index} src={photo.photo} alt={current_car.brand}/>)}
                    </div>
                    <div className={css.carDescriptions}>
                        <div className={css.parameterDescription}>
                            <h2>
                                {
                                    current_car.brand.split(' ').map(
                                        item => item[0].toUpperCase() + item.slice(1)).join(' ')
                                } {
                                current_car['car_model']
                            } {
                                current_car.year
                            }
                            </h2>
                        </div>
                        <div className={css.parameterDescription}>
                            <h2>Price: {current_car.price}</h2>
                        </div>
                        <div className={css.carParameter}>
                            <div className={css.parameterDescription}>
                                <h2>{current_car['car_body'][0].toUpperCase() + current_car['car_body'].slice(1)} class</h2>
                            </div>
                        </div>

                        <div className={css.carParameter}>
                            <div className={css.parameterImg}>
                                <img
                                    src="https://7cars.com.ua/wp-content/themes/avto_n/includes/img/icon/transmission.svg"
                                    alt="gearbox"/>
                            </div>
                            <div className={css.parameterDescription}>
                                <h3>{current_car['gearbox']}</h3>
                            </div>
                        </div>
                        <div className={css.carParameter}>
                            <div className={css.parameterImg}>
                                <img src="https://7cars.com.ua/wp-content/themes/avto_n/includes/img/icon/fuel.svg"
                                     alt="oil"/>
                            </div>
                            <div className={css.parameterDescription}>
                                <h3>{current_car['oil']}</h3>
                            </div>
                        </div>
                    </div>

                </div>
            }
            {
                current_car &&
                <OrderingCar car_id={current_car.id}/>
            }
        </>
    );
};

export {CarDetail};