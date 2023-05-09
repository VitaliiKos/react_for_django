import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {userActions} from "../../redux";
import {SimpleUserProfile, UserProfile} from "../../components";

const UserProfilePage = () => {

    const dispatch = useDispatch();
    const {user_profile} = useSelector(state => state.users);

    useEffect(() => {
        dispatch(userActions.myProfile())

    }, [dispatch])
    return (
        <div>
            {
                !!user_profile &&
                    user_profile['is_staff'] ?
                    <UserProfile user_profile={user_profile}/> :
                    <SimpleUserProfile user_profile={user_profile}/>

            }

        </div>
    );
};

export {UserProfilePage};