import { useContext, useState } from 'react';
import { RecipeContext } from '../../App';
import Card from '../card/card.component'
import './recipe-page.style.scss'

const RecipePage = () => {
    const { selectedRecipe } = useContext(RecipeContext);
    const { ingredients } = selectedRecipe;

    const [ingredientArray, setIngredientArray] = useState([]);

    const addToArray = (array, shouldAdd) => {

        if (shouldAdd) {

            const newArray = [...ingredientArray, array];
            console.log(newArray);
            setIngredientArray(newArray);
        } else {
            const newArray = ingredientArray.filter(item => item.id !== array.id);
            setIngredientArray(newArray);
            console.log(newArray);
        }
    };

    const onClickHandler = () => {
        console.log(ingredientArray);
    }

    return (
        <div>
            <h1>{selectedRecipe && selectedRecipe.informations.receptName}</h1>
            <div className='shopping-list-container'>
                {ingredients.map((el) => {
                    return (
                        <Card array={el} onDelete={null} onAddArray={addToArray} />
                    )
                })}
            </div>
            <div style={{ paddingBottom: '50px' }}>
            </div>
            <div className='recept-footer-selector'>
                <button className="btn-primary btn-max-width" onClick={onClickHandler}>
                    Select All
                </button>
            </div>
        </div>
    );
}

export default RecipePage;