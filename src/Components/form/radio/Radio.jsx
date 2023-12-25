import React from 'react';
import './radio.css';

/**
 * Composant Radio pour les sélections de type radio.
 *
 * @param {Object} props - Les propriétés du composant.
 * @param {boolean} props.checked - Indique si la radio est cochée.
 * @param {function} props.onChange - La fonction à appeler lorsqu'il y a un changement.
 * @param {string} props.value - La valeur associée à la radio.
 * @param {string} [props.iconLink=""] - L'URL de l'icône associée à la radio.
 * @param {string} [props.iconAlt=""] - Le texte alternatif de l'icône associée à la radio.
 * @returns {JSX.Element} - Le composant Radio.
 * @constructor
 */
const Radio = ({ checked, onChange, value, iconLink = "", iconAlt = "" }) => {
    /**
     * Génère l'identifiant unique pour l'élément radio.
     * @type {string}
     */
    const id = `radio-${value}`;

    /**
     * Gère le changement de la valeur de l'élément radio.
     * @param {Event} event - L'événement de changement.
     */
    const handleInputChange = (event) => {
        // Appeler la fonction onChange avec l'événement
        onChange(event);
    };

    /**
     * Gère le clic sur l'étiquette ou l'image associée à l'élément radio.
     * @param {Event} event - L'événement de clic.
     */
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
