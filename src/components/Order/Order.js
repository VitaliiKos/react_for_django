import React, {useEffect} from 'react';
import {carActions, orderActions} from "../../redux";
import {useDispatch, useSelector} from "react-redux";
import css from "../CarDetail/carDetail.module.css";

const Order = ({message}) => {
    const dispatch = useDispatch();
    const {current_car} = useSelector(state => state.cars);

    const {
        id,
        car,
        rent_end,
        rent_start,
    } = message;

    useEffect(() => {
        dispatch(carActions.getById({'id':car}))
    }, [dispatch, id]);



    return (
        <div>
            <h3>{id}</h3>
            <h4>{rent_start}</h4>
            <h4>{rent_end}</h4>
            {
                current_car &&
            <div className={css.carImage}>
                {current_car['photos'].map((photo, index) =>
                    <img key={index} src={photo.photo} alt={current_car.brand}/>)}
            </div>
            }
            {/*<button onClick={}>Edit</button>*/}
            <button onClick={()=>{dispatch(orderActions.deleteOrder({id}))}}>Cancel</button>
        </div>
    );
};

export {Order};