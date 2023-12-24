import React from 'react';
import Radio from "../radio/Radio";
import './Filter.css'
const Filter = ({value, onChange}) => {

    return (
        <div className="headerCheckbox">
            <Radio checked={value}
                   value="all"
                   onChange={onChange}
                   iconLink="https://img.icons8.com/color/48/infinity.png"
            />
            <Radio checked={value}
                   value="carnivore"
                   onChange={onChange}
                   iconLink="https://img.icons8.com/emoji/48/cut-of-meat-emoji.png"
            />
            <Radio checked={value}
                   value="vegan"
                   onChange={onChange}
                   iconLink="https://img.icons8.com/color/48/vegan-food.png"
            />
            <Radio checked={value}
                   value="pescetarien"
                   onChange={onChange}
                   iconLink="https://img.icons8.com/external-soft-fill-juicy-fish/60/external-pescatarian-plant-based-diet-soft-fill-soft-fill-juicy-fish.png"
            />
            <Radio checked={value}
                   value="végétarien"
                   onChange={onChange}
                   iconLink="https://img.icons8.com/office/16/vegetarian-food.png"
            />
            <Radio checked={value}
                   value="fruits de mer"
                   onChange={onChange}
                   iconLink="https://img.icons8.com/office/40/shellfish.png"

            />
        </div>
    );
};

export default Filter;