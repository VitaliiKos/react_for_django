import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";

import {userActions} from "../../redux";
import css from "../UserProfile/userProfile.module.css";
import {AvatarCreateForm} from "../AvatarCreateForm/AvatarCreateForm";
import {OrderingMessages} from "../OrderingMessages/OrderingMessages";

const SimpleUserProfile = ({user_profile}) => {

    const dispatch = useDispatch();
    const [user, setUser] = useState('');
    const {register, setValue, reset, handleSubmit} = useForm()

    useEffect(() => {
        if (user) {
            setValue('name', user.profile.name)
            setValue('surname', user.profile['surname'])
            setValue('age', user.profile.age)
        }
    }, [setValue, user]);


    const save = (user) => {
        if (user) {
            const userId = user.id;
            dispatch(userActions.userUpdate({userId, user}));
            dispatch(userActions.myProfile())
            setUser('')
            reset();
        }
    }

    const {avatar_img} = useSelector(state => state.users);

    useEffect(() => {
        dispatch(userActions.myProfile())

    }, [avatar_img, dispatch])
    return (
        <>
            {
                user_profile &&
                <div className={css.ProfileWrapper}>
                    <div className={css.ProfileImage}>
                        <img src={avatar_img} alt={user_profile.profile.name}/>
                        <AvatarCreateForm/>
                    </div>
                    <div className={css.ProfileDescription}>
                        <div>
                            <button onClick={() => setUser(user_profile)}>Edit</button>
                        </div>
                        <h3>Name: {user_profile.profile.name}</h3>
                        <h3>Surname: {user_profile.profile.surname}</h3>
                        <h3>Age: {user_profile.profile.age}</h3>
                        <h3>Email: {user_profile.email}</h3>
                        {/*<h3>Created: {user_profile.created_at}</h3>*/}
                    </div>

                    <div className={css.my_parks}>
                        <div className={css.title}>
                            <h2>My orders</h2>
                        </div>
                        <OrderingMessages/>
                    </div>

                    {
                        user &&
                        <div className={css.profileForm}>
                            <div className={css.profileFormButtonClose}>
                                <button onClick={() => setUser('')}>X</button>
                            </div>
                            <form onSubmit={handleSubmit(save)}>
                                <div>
                                    <label><h4>Name</h4>
                                        <input type="text" {...register('name')}/>
                                    </label>
                                    <label><h4>Surname</h4>
                                        <input type="text" {...register('surname')}/>
                                    </label>
                                    <label><h4>Age</h4>
                                        <input type="text" {...register('age')}/>
                                    </label>
                                    <div className={css.profileFormButton}>
                                        <button>Save</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    }


                </div>
            }
        </>
    );
};

export {SimpleUserProfile};