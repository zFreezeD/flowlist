import breadLogo from '../../assets/img/white-bread.png'
import { useEffect, useState } from 'react';

import './card.style.scss';
const Card = ({ array, onAddArray, checkmarkToggle, variant, onSaveNewText }) => {
    const cardName = array.ingredientName;
    const cardValue = array.value;

    const [textHeader, setTextHeader] = useState(cardName);
    const [selectedValue, setInputValue] = useState(cardValue)
    const [selectCheckmark, setCheckmark] = useState(false);
    const [isHeaderFocused, setHeaderFocused] = useState(false);
    const [isValueFocused, setValueFocused] = useState(false);

    var mainClass = 'ingredient-card';

    if (variant === "shopping-list")
        mainClass = 'shopping-list-card';

    useEffect(() => {
        setCheckmark(false);
    }, [checkmarkToggle]);

    const handleCheckmarkChange = () => {
        setCheckmark(!selectCheckmark);
        if (selectCheckmark == false)
            onAddArray(array, true);
        else
            onAddArray(array, false);
    }

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    }
    const handleHeaderChange = (event) => {
        setTextHeader(event.target.value);
    }

    const onClickText = () => {
        array.ingredientName = textHeader;
        array.value = selectedValue;
        onSaveNewText(array);
        setHeaderFocused(false);
        setValueFocused(false);
    }

    return (
        <div className={`main-card ${mainClass} ${selectCheckmark ? 'active' : ''}`}>
            <div className='card-left' onClick={handleCheckmarkChange}>
                <img className='card-icon' src={breadLogo} alt='bread' />
            </div>
            <div className='card-right'>

                <input checked={selectCheckmark} onChange={handleCheckmarkChange} className='input-select-ingredient' type="checkbox" />
                <div className='card-input-container'>
                    <textarea value={textHeader} className='input-header' onChange={handleHeaderChange} onFocus={() => setHeaderFocused(true)}
                    />
                    {isHeaderFocused && <button className='btn-primary card-input-btn' onClick={onClickText}>save</button>}
                </div>
                <div style={{ display: "flex" }}>
                    <input className='input-text' value={selectedValue} onChange={handleInputChange} onFocus={() => setValueFocused(true)}
                    />
                    {isValueFocused && <button className='btn-primary card-input-btn' onClick={onClickText}>save</button>}
                </div>
            </div>
        </div>
    )
}

export default Card;