import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Outlet, useNavigate} from "react-router-dom";
import {autoParkActions, userActions} from "../../redux";

import {AutoPark} from "../../components";
import {authService} from "../../services";
import css from "./autoParksPage.module.css";

const AutoParksPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {autoParks} = useSelector(state => state.autoParks);

    useEffect(() => {
        dispatch(userActions.setStatusIsAuthenticated(authService.isAuthenticated()))

    }, [dispatch])

    useEffect(() => {
        dispatch(autoParkActions.getAll())
    }, [dispatch]);

    return (
        <div className={css.autoParksWrapper}>
            <div className={css.autoParksListBlock}>
                <div className={css.autoParkCard}
                     onClick={() => {navigate(`/auto_parks`)}}
                >
                    <h3>All Auto Parks</h3>
                </div>

                {
                    autoParks &&
                    autoParks.map(autoPark => <AutoPark key={autoPark.id} autoPark={autoPark}/>)
                }</div>

            <Outlet/>
        </div>
    );
};

export {AutoParksPage};