import './popup.style.scss';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';

const Popup = (props) => {

    const { value, onChange, onAdd, onClose } = props;

    const onClickAddHandler = () => {
        if (value !== '') {
            onAdd();
        }
    };

    return (
        <div className='popup'>
            <div className='popup-link-container'>
                <input value={value} onChange={(event) => onChange(event.target.value)} type='search' placeholder="https://website.com/receipt/" />
                <Button onClick={onClickAddHandler} variant="primary">Add</Button>{' '}
            </div>
            <Button onClick={onClose} variant="secondary">Close</Button>{' '}
        </div>
    )
}

export default Popup;