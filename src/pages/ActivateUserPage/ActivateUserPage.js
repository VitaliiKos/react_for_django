import React, {useEffect} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {userActions} from "../../redux";

const ActivateUserPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {token} = useParams();
    useEffect(() => {
        dispatch(userActions.activateUser({token}))
        navigate('/login')

    }, [dispatch, token])

    return (
        <div>
            ActivateUserPage
        </div>
    );
};

export {ActivateUserPage};