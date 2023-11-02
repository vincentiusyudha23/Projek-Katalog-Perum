import React from 'react';

const Autocomplete = ({ title, ...props }) => {
    return (
        <div className='flex justify-center items-center w-full my-1'>
            <div className='w-10/12'>
                <label className="label">
                    <span className="label-text text-title-filter">{title}</span>
                </label>
                <input
                    className='input input-bordered w-full max-w-xs'
                    {...props}
                />
            </div>
        </div>
    );
};

export default Autocomplete;
