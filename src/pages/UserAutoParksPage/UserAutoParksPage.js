import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {autoParkActions} from "../../redux";
import {AutoParkForm, CarForm, UserCar} from "../../components";
import css from './UserAutoParksPage.module.css'


const UserAutoParksPage = () => {

    const dispatch = useDispatch();
    const {autoParks, userCars, selectedPark} = useSelector(state => state.autoParks);

    const showCars = (data) => {
        dispatch(autoParkActions.setUserCars(data.cars))
        dispatch(autoParkActions.setSelectedAutoParks(data.park))
    }
    const deletePark = (id)=>{
        dispatch(autoParkActions.deleteAutoPark({id}))
        dispatch(autoParkActions.getAllByUser())
    }
    useEffect(() => {
        dispatch(autoParkActions.getAllByUser())
    }, [dispatch, userCars]);


    return (
        <>
            <div className={css.parkAndCars}>
                <div className={css.parkList}>
                    <div className={css.formBlock}>
                        <div className={css.parkForm}>
                            <AutoParkForm/>
                        </div>
                    </div>
                    {
                        autoParks.map(park =>
                            <div key={park.id} className={css.autoParkBlock}>
                                <div className={css.park}>
                                    <div>
                                        <h2>{park.name}</h2>
                                    </div>
                                    <div>
                                        <button onClick={() => dispatch(autoParkActions.setParkForUpdate(park))}>Update
                                        </button>
                                    </div>
                                    <div>
                                        <button
                                            onClick={() => deletePark(park.id)}>Delete
                                            {/*onClick={() => dispatch(autoParkActions.deleteAutoPark({id: park.id}))}>Delete*/}
                                        </button>
                                    </div>
                                    <div>
                                        <button onClick={() => {
                                            showCars({cars: park.cars, park: park.id})
                                        }}>Show cars
                                        </button>
                                    </div>
                                </div>
                            </div>)
                    }</div>
                <div className={css.carsList}>

                    {!!userCars.length &&
                        <>
                            <div className={css.carForm}>
                                <CarForm selectedPark={selectedPark}/>
                            </div>
                            {userCars.map(car => <div key={car.id} className={css.car}><UserCar car={car}/></div>)}
                        </>
                    }
                </div>
            </div>
        </>
    );
};

export {UserAutoParksPage};