import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {autoParkActions, carActions} from "../../redux";
import {authService} from "../../services";
import css from "./autoPark.module.css";

const AutoPark = ({autoPark}) => {
    const navigate = useNavigate();
    const {id, name} = autoPark;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(carActions.setStatusIsAuthenticated(authService.isAuthenticated()))
    }, [dispatch])
    return (

        <div className={css.autoParkCard}
             onClick={() => {navigate(`${id}`)}}
        >
            <h3>{name[0].toUpperCase() + name.slice(1)}</h3>
            {/*<button onClick={() => {*/}
            {/*    navigate(`${id}`)*/}
            {/*}}>Detail*/}
            {/*</button>*/}
            {/*<button onClick={() => dispatch(carActions.setCarForUpdate(autoPark))}>Update</button>*/}
            {/*<button onClick={() => dispatch(autoParkActions.deleteAutoPark({id}))}>Delete</button>*/}
        </div>
    );
};
export {AutoPark};