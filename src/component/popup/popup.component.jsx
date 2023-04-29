import './popup.style.scss';
import { useState } from 'react';

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
                <button onClick={onClickAddHandler} variant="primary">Add</button>{' '}
            </div>
            <button onClick={onClose} variant="secondary">Close</button>{' '}
        </div>
    )
}

export default Popup;