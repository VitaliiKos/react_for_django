import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {carActions} from "../../redux";
import css from "../Car/car.module.css";
import {baseURL} from "../../config";

const CarDetail = () => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const {current_car} = useSelector(state => state.cars);

    useEffect(() => {
        dispatch(carActions.getById({id}))
    }, [dispatch, id]);
    return (
        <div>
            {
                current_car &&
                <div>
                    <div>
                        <h3>Brand: {current_car.brand}</h3>
                        <h3>Brand: {current_car.price}</h3>
                        <h3>Brand: {current_car.year}</h3>
                    </div>
                    <div>
                        {current_car['photos'].map((photo, index) =>
                            <div className={css.carImg} key={index}>
                                <img src={`${baseURL}${photo}`} alt={current_car.brand}/>
                            </div>
                        )
                        }
                    </div>
                </div>
            }

        </div>
    );
};

export {CarDetail};