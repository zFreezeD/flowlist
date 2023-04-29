import { Link } from 'react-router-dom';
import './menu-card.style.scss';

const MenuCard = ({ recept, click }) => {
    console.log(recept);
    const { receptName, receptLink, receptImage } = recept.informations;
    const onClickMenuCardHandler = click;
    const onClickHandler = () => {
        if (onClickMenuCardHandler !== '') {
            onClickMenuCardHandler(recept);
        }
    }

    return (
        <Link
            to={`/recipes`}
            className="menu-card-small recept"
            style={{ backgroundImage: `url(${receptImage})` }}
            onClick={onClickHandler}
        >
            <h2>{receptName}</h2>
        </Link>
    )
}

export default MenuCard;