import breadLogo from '../../assets/img/white-bread.png'
import { useState } from 'react';
import './card.style.scss';
const Card = ({ array, onDelete } ) => {

    const cardName = array.name;
    const cardValue = array.value;
    const cardUnit = array.unit;


    const [selectedUnit, setSelectedUnit] = useState(cardUnit);
    const [selectedValue, setInputValue] = useState(cardValue)

    const handleUnitChange = (event) => {
        setSelectedUnit(event.target.value);
    };

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    }

    const deleteCard = () => {
        onDelete();
      };

    return (
        <div className='shopping-list-card'>
            <div className='card-left'>
                <img className='card-icon' src={breadLogo} alt='bread' />
            </div>
            <div className='card-right'>
                <div onClick={deleteCard} className='card-remove'>X</div>
                <h3>{cardName}</h3>
                <div style={{ display: "flex" }}>
                    <input value={selectedValue} onChange={handleInputChange} />
                    <select value={selectedUnit} onChange={handleUnitChange}>
                        <option value='ml'>ml</option>
                        <option value='L'>L</option>
                        <option value='g'>g</option>
                        <option value='kg'>kg</option>
                        <option value='Stk.'>Stk.</option>
                        <option value='Pk.'>Pk.</option>
                    </select>
                </div>
            </div>
        </div>
    )
}

export default Card;