import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {autoParkActions} from "../../redux";
import {Car} from "../Car/Car";

const AutoParkDetail = () => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const {current_auto_park} = useSelector(state => state.autoParks);

    useEffect(() => {
        dispatch(autoParkActions.getById({id}))
    }, [dispatch, id])
    console.log(current_auto_park)

    return (
        <div>
            {
                current_auto_park &&
                <h3>{current_auto_park.name}</h3>
            }
            {current_auto_park &&

                current_auto_park.cars.map(car => <Car key={car.id} car={car}/>)
            }

        </div>
    );
};

export {AutoParkDetail};