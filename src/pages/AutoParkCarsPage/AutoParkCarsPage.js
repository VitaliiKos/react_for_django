import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";

import {carActions} from "../../redux";
import {Car} from "../../components";
import css from "../CarsPage/carsPage.module.css";

const AutoParkCarsPage = () => {
    const {id} = useParams();

    const dispatch = useDispatch();
    const {cars} = useSelector(state => state.cars);
    // const {statusIsAuthenticated} = useSelector(state => state.users);

    useEffect(() => {
        dispatch(carActions.getAllByPark({id}))
    }, [dispatch, id]);

    // useEffect(()=>{
    //     dispatch(userActions.setStatusIsAuthenticated(authService.isAuthenticated()))
    // },[dispatch, statusIsAuthenticated])
    return (
        <div className={css.carWrapper}>

            <div className={css.carListBlock}>
                {
                    cars &&
                    cars.map(car => <Car key={car.id} car={car}/>)
                }</div>
            <div>
                {/*<button disabled={!prevPage} onClick={() => setQuery(query => ({page: +query.get('page') - 1}))}>PrevPage</button>*/}
                {/*<button disabled={!nextPage}*/}
                {/*        onClick={() => setQuery(query => ({page: +query.get('page') + 1}))}>NextPage*/}
                {/*</button>*/}
            </div>
        </div>
    );
};

export {AutoParkCarsPage};