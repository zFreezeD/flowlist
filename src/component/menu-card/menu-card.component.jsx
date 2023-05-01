import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { RecipeContext } from '../../App';
import './menu-card.style.scss';

const MenuCard = ({ recept, click, deleteProp }) => {
    const { receptName, receptLink, receptImage } = recept.informations;
    const onClickMenuCardHandler = click;
    const { setSelectedRecipe } = useContext(RecipeContext);
    const onClickHandler = () => {
        if (onClickMenuCardHandler !== null) {
            setSelectedRecipe(recept);
            onClickMenuCardHandler(recept);
        }
    }

    const onDeleteHandler = () => {
        if (deleteProp) {
            deleteProp(recept.id);
        }
    };

    return (
        <div className="menu-card-small recept" style={{ backgroundImage: `url(${receptImage})` }}>
            <div onClick={onDeleteHandler} className='delete-container'>
                X
            </div>
            <Link
                to={`/recipe`}
                recept={receptName}
                onClick={onClickHandler}
            >
                <h2>{receptName}</h2>
            </Link>
        </div>
    )
}

export default MenuCard;