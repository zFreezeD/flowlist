import breadLogo from '../../assets/img/white-bread.png'
import { useEffect, useState } from 'react';

import './card.style.scss';
const Card = ({ array, onAddArray }) => {
    const cardName = array.ingredientName;
    const cardValue = array.value;
    const cardUnit = array.unit;

    /*useEffect(() => {
        console.log("cardArray: ", array);
        console.log("name: ", cardName);
        console.log("value: ", cardValue);
        console.log("unit: ", cardUnit);
    }, []);*/

    const [textHeader, setTextHeader] = useState(cardName);
    const [selectedUnit, setSelectedUnit] = useState(cardUnit);
    const [selectedValue, setInputValue] = useState(cardValue)
    const [selectCheckmark, setCheckmark] = useState(false);

    const handleCheckmarkChange = () => {
        setCheckmark(!selectCheckmark);
        if (selectCheckmark == false)
            onAddArray(array, true);
        else
            onAddArray(array, false);
    }

    const handleUnitChange = (value) => {
        setSelectedUnit(value);
    };

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    }
    const handleHeaderChange = (event) => {
        setTextHeader(event.target.value);
    }

    const deleteCard = () => {

    };

    return (
        <div className={`shopping-list-card ${selectCheckmark ? 'active' : ''}`}>
            <div className='card-left' onClick={handleCheckmarkChange}>
                <img className='card-icon' src={breadLogo} alt='bread' />
            </div>
            <div className='card-right'>
                <input checked={selectCheckmark} onChange={handleCheckmarkChange} className='input-select-ingredient' type="checkbox" />
                <textarea value={textHeader} className='input-header' onChange={handleHeaderChange} />
                <div style={{ display: "flex" }}>
                    <input className='input-text' value={selectedValue} onChange={handleInputChange} />
                </div>
            </div>
        </div>
    )
}

export default Card;