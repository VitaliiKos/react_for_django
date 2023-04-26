import React, {useState} from 'react';
import {useForm} from "react-hook-form";

const FileInput = () => {
    const {register, watch, handleSubmit, formState: {errors}} = useForm();
    const [image, setImage] = useState('');

    const convertImage = file => {
        const reader = new FileReader()

        reader.onloadend = () => {
            setImage(reader.result.toString())
        };
        reader.readAsDataURL(file);
    };

    const onSubmit = data => {
        if (data.files.length > 0) {
            convertImage(data.files[0]);
        }
    }

    return (
        <div className="container">
            {/*{image ? <img src={image} width='450' alt=""/>:null}*/}
            <form onSubmit={handleSubmit(onSubmit)}>
                {!watch('files') || watch('files').length === 0 ? (
                    <div>
                        <input type="file" id='fileupload' {...register('files')} style={{display:"none"}}/>
                        <label htmlFor="fileupload" style={{cursor: 'pointer'}}>
                            Select file ...
                        </label>
                    </div>
                ):(
                    <strong>{watch('files')[0].name}</strong>
                )}
                <button type='submit' className={'btn'}>
                    Submit
                </button>
                {errors.files && <div className='error'>{errors.files.message}</div>}
            </form>


        </div>
    );
};

export {FileInput};
