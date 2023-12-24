import React from 'react';
import './radio.css'

const Radio = ({ checked, onChange, value, iconLink = "", iconAlt = "" }) => {
    const id = `radio-${value}`;

    const handleInputChange = (event) => {
        // Appeler la fonction onChange avec l'événement
        onChange(event);
    };

    const handleLabelImageClick = (event) => {
        // Empêcher la propagation de l'événement pour éviter les doublons
        event.stopPropagation();
        // Appeler la fonction onChange avec l'événement
        onChange(event);

        // Cocher la radio uniquement si elle n'est pas déjà cochée
        if (checked !== value) {
            // Simuler un événement pour cocher la radio
            const simulatedEvent = {
                target: {
                    value,
                    type: 'radio',
                    checked: true,
                },
            };
            onChange(simulatedEvent);
        }
    };

    return (
        <div className="radio">

            <input
                type="radio"
                id={id}
                value={value}
                checked={checked === value}
                onChange={handleInputChange}
            />
            <label htmlFor={id} onClick={handleLabelImageClick}>
                {value}
            </label>
            <img onClick={handleLabelImageClick} src={iconLink} alt={iconAlt === "" ? value : iconAlt} />
        </div>
    );
};

export default Radio;
