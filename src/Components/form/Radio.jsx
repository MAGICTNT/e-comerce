import React from 'react';

const Radio = ({ checked, onChange, value }) => {
    const id = `radio-${value}`;

    return (
        <div>
            <input
                type="radio"
                id={id}
                value={value}
                checked={checked === value}
                onChange={onChange}
            />
            <label htmlFor={id} onClick={onChange}>
                {value}
            </label>
        </div>
    );
};

export default Radio;