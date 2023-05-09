import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";

import {AvatarCreateForm} from "../AvatarCreateForm/AvatarCreateForm";
import {UserAutoParksPage} from "../../pages";
import {userActions} from "../../redux";
import css from './userProfile.module.css';

const UserProfile = ({user_profile}) => {

    const {
        email,
        profile: {age, name, surname},
        created_at,
        updated_at
    } = user_profile;

    const dispatch = useDispatch();
    const [user, setUser] = useState('');
    const {avatar_img} = useSelector(state => state.users);

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
            setUser('')
            reset();
            dispatch(userActions.myProfile())

        }
    }

    return (
        <div className={css.ProfileWrapper}>
            <div className={css.ProfileImage}>
                <img src={avatar_img} alt={name}/>
                <AvatarCreateForm/>
            </div>
            <div className={css.ProfileDescription}>
                <div>
                    <button onClick={() => setUser(user_profile)}>Edit</button>
                </div>
                <h3>Name: {name}</h3>
                <h3>Surname: {surname}</h3>
                <h3>Age: {age}</h3>
                <h3>Email: {email}</h3>
                <h3>Created: {created_at}</h3>
                <h3>Created: {updated_at}</h3>
            </div>

            <div className={css.my_parks}>
                <div className={css.title}>
                    <h2>My auto parks</h2>
                </div>

                <UserAutoParksPage/>

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
    );
};

export {UserProfile};