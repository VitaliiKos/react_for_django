import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {autoParkActions, carActions} from "../../redux";
import {authService} from "../../services";
import css from './userCar.module.css'
import {useForm} from "react-hook-form";

const UserCar = ({car}) => {
    const {id, brand, year, price, photos} = car;
    // console.log(photos)

    const dispatch = useDispatch();
    const {userCars} = useSelector(state => state.autoParks);
    const {register, handleSubmit, reset} = useForm();

    const onSubmit = async (data) => {
        const formData = new FormData();

        formData.append("photo", data.photo[0]);

        await dispatch( carActions.addPhoto({id, formData}));

        reset()
    }


    useEffect(() => {
        dispatch(autoParkActions.getAllByUser())
    }, [dispatch, userCars]);


    useEffect(() => {
        dispatch(carActions.setStatusIsAuthenticated(authService.isAuthenticated()))
    }, [dispatch])
    return (
        <div className={css.carWrapper}>
            <div className={css.carDescription}>
                <h3>{id}. {brand}</h3>
                <h3>Year: {year}</h3>
                <h3>Price: {price}</h3>

                <div className={css.carButtonBlock}>
                    <button onClick={() => dispatch(carActions.setCarForUpdate(car))}>Update</button>
                    <button onClick={() => dispatch(carActions.deleteCar({id}))}>Delete</button>
                </div>
            </div>

            <div className={css.carImageWrapper}>
                <div className={css.carPhotoForm}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input type="file" placeholder={'+'} {...register("photo")} />

                        <input type="submit"/>
                    </form>
                </div>
                {!!photos.length &&
                    photos.map((photo, index) =>
                        <div key={index} className={css.carImage}>
                            <div className={css.deletePhoto}>
                                <button onClick={() => dispatch(carActions.deletePhoto({'id':photo.id}))}>X</button>
                            </div>

                            <img src={photo.photo} alt={brand}/>
                        </div>)
                }
            </div>

        </div>
    );
};

export {UserCar};