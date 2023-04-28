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
        <div
            style={{
                backgroundImage: `url(${receptImage})`
            }}
            onClick={onClickHandler}
            className="menu-card-small recept">
            <h2>{receptName}</h2>
        </div>
    )
}

export default MenuCard;