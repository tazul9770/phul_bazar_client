import React, { useEffect, useState } from 'react';

const Effect = () => {
    const [count, setCount] = useState(0)

    useEffect(() => {
        console.log(count)
    }, [count])

    return (
        <div>
            <p className='m-5'>Count: {count}</p>
            <button onClick={() => setCount(count+1)} className='m-5 px-3 py-2 bg-amber-500 text-white rounded-lg'>Click here</button>
        </div>
    );
};

export default Effect;