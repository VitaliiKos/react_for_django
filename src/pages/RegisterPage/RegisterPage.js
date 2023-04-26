import React, {useState} from 'react';
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";

import {registerService} from "../../services";

const RegisterPage = () => {
    const {register, handleSubmit} = useForm();
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    const registerUser = async (user) => {
        try {
            await registerService.create(user)
            navigate('/login/msg')
        } catch (e) {
            setError(e.response.data.detail)
        }
    }

    return (
        <div>
            <div>
                <form onSubmit={handleSubmit(registerUser)}>
                    <input type="text" placeholder={'email'} {...register('email')}/>
                    <input type="text" placeholder={'password'} {...register('password')}/>
                    <input type="text" placeholder={'profile.name'} {...register('profile.name')}/>
                    <input type="text" placeholder={'profile.surname'} {...register('profile.surname')}/>
                    <input type="text" placeholder={'profile.age'} {...register('profile.age')}/>
                    <button>Save</button>
                </form>
            </div>

            {error &&
                <div>
                    {error}
                </div>
            }

        </div>
    );
};

export {RegisterPage};