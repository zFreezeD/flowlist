import breadLogo from '../../assets/img/white-bread.png'
import { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

import './card.style.scss';
const Card = ({ array, onDelete }) => {

    const cardName = array.name;
    const cardValue = array.value;
    const cardUnit = array.unit;


    const [selectedUnit, setSelectedUnit] = useState(cardUnit);
    const [selectedValue, setInputValue] = useState(cardValue)

    const handleUnitChange = (value) => {
        setSelectedUnit(value);
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
                    <DropdownButton onSelect={handleUnitChange} id="dropdown-basic-button" title={selectedUnit}>
                        <Dropdown.Item eventKey='ml' >ml</Dropdown.Item>
                        <Dropdown.Item eventKey='L'>L</Dropdown.Item>
                        <Dropdown.Item eventKey='g'>g</Dropdown.Item>
                        <Dropdown.Item eventKey='kg'>kg</Dropdown.Item>
                        <Dropdown.Item eventKey='Stk.'>Stk.</Dropdown.Item>
                        <Dropdown.Item eventKey='Pk.'>Pk.</Dropdown.Item>
                    </DropdownButton>
                    {/*<select value={selectedUnit} onChange={handleUnitChange}>
                        <option value='ml'>ml</option>
                        <option value='L'>L</option>
                        <option value='g'>g</option>
                        <option value='kg'>kg</option>
                        <option value='Stk.'>Stk.</option>
                        <option value='Pk.'>Pk.</option>
                    </select>*/}
                </div>
            </div>
        </div>
    )
}

export default Card;