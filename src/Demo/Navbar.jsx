import React from 'react';

const Navbar = ({itemtsCount}) => {
    return (
        <div>
            <p className='m-4 '>{itemtsCount}</p>
        </div>
    );
};

export default Navbar;