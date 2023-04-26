import React, {useEffect} from 'react';
import {useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";
import {useDispatch, useSelector} from "react-redux";

import {autoParkActions} from "../../redux";
import {AutoParkValidator} from "../../validators/autoParkValidator";
import css from "./autoParkForm.module.css";

const AutoParkForm = () => {
    const {register, setValue, reset, handleSubmit} = useForm({
        mode: "all",
        resolver: joiResolver(AutoParkValidator)
    });
    const dispatch = useDispatch();
    const {autoParkForUpdate} = useSelector(state => state.autoParks);

    useEffect(() => {
        if (autoParkForUpdate) {
            setValue('name', autoParkForUpdate.name, {shouldValidate: true})
        }
    }, [setValue, autoParkForUpdate]);

    const save = (park) => {
        if (autoParkForUpdate) {
            const parkId = autoParkForUpdate.id;
            dispatch(autoParkActions.updatePark({parkId, park}));
            dispatch(autoParkActions.setParkForUpdate(null));
            reset();
        } else {
            dispatch(autoParkActions.createNew({park}));
            reset();
        }
        dispatch(autoParkActions.getAllByUser())
    }

    return (
        <>
            <form onSubmit={handleSubmit(save)}>
                <div className={css.parkFormInput}>
                    <label><h4>Park Name</h4>
                        <input type="text" {...register('name')}/>
                    </label>
                    <button>{autoParkForUpdate ? 'Update' : 'Create'}</button>
                </div>
            </form>
        </>
    );
};

export {AutoParkForm};