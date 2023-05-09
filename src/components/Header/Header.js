import React, {useEffect} from 'react';
import {NavLink} from "react-router-dom";
import {RouterEndpoints} from "../../routes";
import {useDispatch, useSelector} from "react-redux";

import {UserInfo} from "../UserInfo/UserInfo";
import {userActions} from "../../redux";
import {authService} from "../../services";
import css from './header.module.css';


const Header = () => {
    const dispatch = useDispatch();
    const {statusIsAuthenticated} = useSelector(state => state.users);

    useEffect(() => {
        dispatch(userActions.setStatusIsAuthenticated(authService.isAuthenticated()))

    }, [dispatch, statusIsAuthenticated])

    return (
        <div className={css.menu}>
            <NavLink to={''}>Home</NavLink>
            <div className={css.authMenu}>
                <NavLink to={RouterEndpoints.autoParks}>Parks</NavLink>
            </div>
            {!statusIsAuthenticated &&
                <div>
                    <NavLink to={RouterEndpoints.login}>Login</NavLink>
                    <NavLink to={RouterEndpoints.register}>Register</NavLink>
                </div>
            }

            {statusIsAuthenticated &&
                <div className={css.userProfile}>
                    <div className={css.userInfo}>
                        <UserInfo/>
                    </div>
                </div>
            }
        </div>
    );
};

export {Header};
