import React, {useEffect} from 'react';
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {joiResolver} from "@hookform/resolvers/joi";

import {autoParkActions, carActions} from "../../redux";
import {CarValidator} from "../../validators/carValidator";
import css from './carForm.module.css';

const CarForm = ({selectedPark}) => {

    const {register, setValue, reset, handleSubmit} = useForm({
        mode: "all",
        resolver: joiResolver(CarValidator)
    });
    const dispatch = useDispatch();
    const {carForUpdate} = useSelector(state => state.cars);


    useEffect(() => {
        if (carForUpdate) {
            setValue('brand', carForUpdate.brand, {shouldValidate: true})
            setValue('price', carForUpdate.price, {shouldValidate: true})
            setValue('year', carForUpdate.year, {shouldValidate: true})
        }
    }, [setValue, carForUpdate]);


    const save = (car) => {
        if (carForUpdate) {
            const carId = carForUpdate.id;
            dispatch(carActions.updateCar({carId, car}));
            dispatch(carActions.setCarForUpdate(null));
            reset();
        } else {
            dispatch(carActions.createNew({car, selectedPark}));
            reset();
        }
        dispatch(autoParkActions.getAllByUser())

    }

    return (
        <div className={css.formBlock}>
            <form onSubmit={handleSubmit(save)}>
                <div className={css.carFormInput}>
                    <label><h4>Brand</h4>
                        <input type="text" {...register('brand')}/>
                    </label>
                    <label><h4>Year</h4>
                        <input type="text" {...register('year', {valueAsNumber: true})}/>
                    </label>
                    <label><h4>Price</h4>
                        <input type="text" {...register('price', {valueAsNumber: true})}/>
                    </label>
                    <button>{carForUpdate ? 'Update' : 'Create'}</button>
                </div>
            </form>
        </div>
    );
};

export {CarForm};