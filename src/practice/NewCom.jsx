import React, { useState } from 'react';

const NewCom = () => {

    const [person, setPerson] = useState({
        first_name : "Tazul",
        last_name : "Islam",
        email : "tz@gmail.com",
        address : {
            city:"dhaka"
        }
    })

    const handleClick = () => {
        const newObj = {
            ...person, first_name : "Fahmidul", phone : "424364",
            address : {
                ...person.address, city:"mirpur"
            }
        }
        setPerson(newObj)
    }

    return (
        <div>
            <h1 className='text-2xl'>Shakib world best all rounder</h1>
            <p>{person.first_name} {person.last_name} {person.email} {person.phone}</p>
            <p>{person.address.city}</p>
            <button onClick={handleClick} className='m-6 px-4 py-2 bg-green-500 rounded-lg'>Count</button>
        </div>
    );
};

export default NewCom;