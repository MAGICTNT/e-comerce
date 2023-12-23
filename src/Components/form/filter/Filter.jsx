import React from 'react';
import Radio from "../radio/Radio";
import './Filter.css'
const Filter = ({value, onChange}) => {
    return (
        <div className="headerCheckbox">
            <Radio checked={value} value="all" onChange={onChange}/>
            <Radio checked={value} value="carnivore" onChange={onChange}/>
            <Radio checked={value} value="vegan" onChange={onChange}/>
            <Radio checked={value} value="pescetarien" onChange={onChange}/>
            <Radio checked={value} value="végétarien" onChange={onChange}/>
            <Radio checked={value} value="fruits de mer" onChange={onChange}/>
        </div>
    );
};

export default Filter;