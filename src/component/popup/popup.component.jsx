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
            <div className='popup-main-container'>
                <div className='popup-link-container'>
                    <input value={value} onChange={(event) => onChange(event.target.value)} type='search' placeholder="https://website.com/receipt/" />
                    <button onClick={onClickAddHandler} className='btn-primary'>Add</button>{' '}
                </div>
                <div className='popup-close-container'>
                    <button onClick={onClose} className='btn-primary'>Close</button>{' '}
                </div>

            </div>


        </div>
    )
}

export default Popup;