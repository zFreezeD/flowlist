import { useContext } from 'react';
import { RecipeContext } from '../../App';
import Card from '../card/card.component'
import './recipe-page.style.scss'

const RecipePage = () => {
    const { selectedRecipe } = useContext(RecipeContext);
    const { ingredients } = selectedRecipe;
    console.log("rrr ", ingredients);
    return (
        <div>
            <h1>{selectedRecipe && selectedRecipe.informations.receptName}</h1>
            <div className='shopping-list-container'>
                {ingredients.map((el) => {
                    return (
                        <Card array={el} onDelete={null} />
                    )
                })}
            </div>
            <div style={{ paddingBottom: '50px' }}>
            </div>
            <div className='recept-footer-selector'>
                <button className="btn-primary btn-max-width">
                    Select All
                </button>
            </div>
        </div>
    );
}

export default RecipePage;