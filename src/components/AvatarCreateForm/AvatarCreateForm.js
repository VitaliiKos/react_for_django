import React from 'react';
import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";

import {userActions} from "../../redux";

const AvatarCreateForm = () => {
    const dispatch = useDispatch();

    const {register, handleSubmit, reset} = useForm();
    const onSubmit = async (data) => {
        const formData = new FormData();

        formData.append("avatar", data.avatar[0]);

        await dispatch(userActions.addAvatar({formData}));

        dispatch(userActions.myProfile())
        reset()
    };

    return (
        <div className="App">
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="file" {...register("avatar")} />

                <input type="submit"/>
            </form>
        </div>
    );
};

export {AvatarCreateForm};