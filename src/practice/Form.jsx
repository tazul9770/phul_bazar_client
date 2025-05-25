import { useState } from "react";

const Form = () => {

    const personObj = {name:"", age:""}

    const [person, setPerson] = useState(personObj)

    const handleSubmit = (event) => {
        event.preventDefault()
        console.log(person);
    }

    return (
        <div className="w-1/2 mx-auto">
            <form onSubmit={handleSubmit}>
                <div className='m-4'>
                    <label 
                        htmlFor="name" 
                        className='block text-gray-700 mb-4 font-bold text-sm'
                    >
                        Name: 
                    </label>
                    <input
                        onChange={(event) => setPerson({...person, name: event.target.value})}
                        value={person.name}
                        id='name'
                        type="text" 
                        className='w-full px-2 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4'
                    />

                    <label 
                        htmlFor="age" 
                        className='block text-gray-700 mb-4 font-bold text-sm'
                    >
                        Age: 
                    </label>
                    <input 
                        onChange={(event) => setPerson({...person, age:parseInt(event.target.value)})}
                        value={person.age}
                        id='age'
                        type="number" 
                        className='w-full px-2 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                    />
                </div>
                <button className='m-5 px-3 py-2 bg-blue-500 text-white rounded-sm'>Submi</button>
            </form>
        </div>
    );
};

export default Form;