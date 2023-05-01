import { useContext, useState } from 'react';
import { RecipeContext } from '../../App';
import { firebaseSaveShoppingList } from '../../utils/firebase/firebase.utils';
import Card from '../card/card.component'
import './recipe-page.style.scss'

const RecipePage = () => {
    const { selectedRecipe } = useContext(RecipeContext);
    const { informations, ingredients } = selectedRecipe;
    const [checkmarkToggle, setCheckmarkToggle] = useState(false);
    const [ingredientArray, setIngredientArray] = useState([]);

    console.log(selectedRecipe);

    var btnName = "Select all";
    if (ingredientArray.length > 0)
        btnName = "add (" + ingredientArray.length + ") items to shoppinglist";

    const addToArray = (array, shouldAdd) => {
        if (shouldAdd) {

            const newArray = [...ingredientArray, array];
            setIngredientArray(newArray);
        } else {
            const newArray = ingredientArray.filter(item => item.id !== array.id);
            setIngredientArray(newArray);
        }
    };

    const onClickHandler = () => {
        firebaseSaveShoppingList(ingredientArray, true);
        console.log("recip", ingredientArray);
        setIngredientArray([]);
        if (checkmarkToggle === true)
            setCheckmarkToggle(false);
        else
            setCheckmarkToggle(true);
    }





    return (
        <div>
            <h1>{selectedRecipe && selectedRecipe.informations.receptName}</h1>
            <div className='shopping-list-receptlink' onClick={() => window.open(informations.receptLink, '_blank')}>
                <p>to chefkoch page</p>
            </div>
            <div className='shopping-list-container'>
                {ingredients.map((el) => {
                    return (
                        <Card key={el.id} array={el} onAddArray={addToArray} checkmarkToggle={checkmarkToggle}/>
                    )
                })}
            </div>
            <div style={{ paddingBottom: '130px' }}>
            </div>
            <div className='recept-footer-selector'>
                <button className="btn-primary btn-max-width" onClick={onClickHandler}>
                    {btnName}
                </button>
            </div>
        </div>
    );
}

export default RecipePage;