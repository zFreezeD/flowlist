import Card from "../card/card.component";
import { useState } from "react";

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

    const handleDeleteCard = (index) => {
        const updatedCards = cards.filter((_, i) => i !== index);
        setCards(updatedCards);
    };

    return (
        <div className="shopping-list-container">
            {cards.map((card, index) => (
                <Card key={card.id} array={card} onDelete={() => handleDeleteCard(index)} />
            ))}
        </div>
    );
};

export default ShoppingListContainer;