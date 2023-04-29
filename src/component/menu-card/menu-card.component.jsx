import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { RecipeContext } from '../../App';
import './menu-card.style.scss';

const MenuCard = ({ recept, click }) => {
    const { receptName, receptLink, receptImage } = recept.informations;
    const onClickMenuCardHandler = click;
    const { setSelectedRecipe } = useContext(RecipeContext);
    const onClickHandler = () => {
        if (onClickMenuCardHandler !== '') {
            setSelectedRecipe(recept);
            onClickMenuCardHandler(recept);
        }
    }

    return (
        <Link
            to={`/recipe`}
            recept={receptName}
            className="menu-card-small recept"
            style={{ backgroundImage: `url(${receptImage})` }}
            onClick={onClickHandler}
        >
            <h2>{receptName}</h2>
        </Link>
    )
}

export default MenuCard;