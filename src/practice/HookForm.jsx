import React from 'react';
import { useForm } from 'react-hook-form';

const HookForm = () => {

    const {
        register, 
        handleSubmit,
        formState:{errors}
    } = useForm();

    const onSubmit = (data) => {
        console.log(data);
    }

    return (
        <div className='w-1/2 mx-auto mb-5'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label 
                        htmlFor="name"
                        className='block mb-3 text-sm text-gray-700 font-bold'
                    >
                        Name:    
                    </label>
                    <input 
                        {...register("name", {required:true})}
                        id='name'
                        type="text" 
                        className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400 mb-4'
                    />
                    {errors.name && <span>Name is required</span> }
                    <label 
                        htmlFor="age"
                        className='block mb-3 text-sm text-gray-700 font-bold'
                    >
                        Age:    
                    </label>
                    <input 
                        {...register("age", {required:true})}
                        id='age'
                        type="number" 
                        className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400 mb-4'
                    />
                    {errors.age && <span>Age is required</span> }
                </div>
                <button className='px-3 py-2 bg-green-500 text-white rounded-md'>Submit</button>
            </form>
        </div>
    );
};

export default HookForm;