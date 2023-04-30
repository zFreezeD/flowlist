import { useState, useEffect, useContext } from "react";
import './shopping-list.style.scss';
import { firebaseGetShoppingList, firebaseSaveShoppingList } from "../../utils/firebase/firebase.utils";
import Card from '../card/card.component';
import { v4 as uuidv4 } from "uuid";
const ShoppingListContainer = () => {



    const [cardArray, setCards] = useState([]);
    const [selectedCards, setSelectedCards] = useState([]);
    const [checkmarkToggle, setCheckmarkToggle] = useState(false);


    useEffect(() => {
        const getCards = async () => {
            const firebaseArray = await firebaseGetShoppingList();
            setCards(firebaseArray);
        };
        getCards();
    }, []);

    const addNewIngredient = async () => {
        const newIngredient = {
            "ingredientName": "new..",
            "id": uuidv4(),
            "value": "value.."
        };
        const newArray = [...cardArray, newIngredient];
        setCards(newArray);
        firebaseSaveShoppingList(newArray, false);
    }

    const addToArray = (array, shouldAdd) => {
        if (shouldAdd) {

            const newArray = [...selectedCards, array];
            setSelectedCards(newArray);
        } else {
            const newArray = selectedCards.filter(item => item.id !== array.id);
            setSelectedCards(newArray);
        }

    };

    const onClickHandler = async () => {

        if (checkmarkToggle === true)
            setCheckmarkToggle(false);
        else
            setCheckmarkToggle(true);

        var newArray = cardArray;
        for (let i = 0; i < newArray.length; i++) {
            for (let x = 0; x < selectedCards.length; x++) {
                if (newArray[i].id == selectedCards[x].id) {
                    newArray.splice(i, 1);
                }

            }
        }

        await firebaseSaveShoppingList(newArray, false);
        setCards(newArray);
    }

    function onSaveNewText(array) {
        var newArray = cardArray;
        const myID = array.id;
        const myName = array.ingredientName;
        const myValue = array.value;
        for (let i = 0; i < newArray.length; i++) {
            if (newArray[i].id == myID) {
                newArray[i].ingredientName = myName;
                newArray[i].value = myValue;
            }
            break;
        }
        firebaseSaveShoppingList(newArray, false);
        setCards(newArray);


    }

    return (
        <div className="shopping-list-container">
            <h2>My Shoppinglist</h2>
            {cardArray.map((el) => (
                <Card key={el.id} array={el} onAddArray={addToArray} checkmarkToggle={checkmarkToggle} variant={"shopping-list"} onSaveNewText={onSaveNewText} />
            ))}
            <div className="shopping-list-addingredient" onClick={addNewIngredient}>
                +
            </div>
            <div className='recept-footer-selector'>
                {selectedCards.length > 0 && (
                    <button className="btn-primary btn-max-width" onClick={onClickHandler}>
                        Remove Cards
                    </button>
                )}
            </div>
        </div>



    );
};

export default ShoppingListContainer;