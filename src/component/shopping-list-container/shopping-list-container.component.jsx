import Card from "../card/card.component";
import { useState } from "react";
import './shopping-list.style.scss';

const ShoppingListContainer = () => {
    const cardArray = [
        {
            id: "1",
            name: "Bread",
            value: "300",
            unit: "g",
        },
        {
            id: "2",
            name: "Banana",
            value: "3",
            unit: "Stk.",
        },
        {
            id: "3",
            name: "Milch",
            value: "500",
            unit: "ml",
        },
    ];

    const [cards, setCards] = useState(cardArray);

    const addToArray = (array, shouldAdd) => {
        //setCards(updatedCards);
    };

    return (
        <div className="shopping-list-container">
            {cards.map((card, index) => (
                <Card key={card.id} array={card} onAddArray={() => addToArray()} />
            ))}
        </div>

    );
};

export default ShoppingListContainer;