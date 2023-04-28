import './menu-card.style.scss';

const MenuCard = ({ recept }) => {
    console.log(recept);
    const { receptName, receptLink} = recept.informations;

    return (
        <div className="menu-card-small recept">
            <h2>{receptName}</h2>
        </div>
    )
}

export default MenuCard;