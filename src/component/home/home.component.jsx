import { Link } from "react-router-dom";
import MenuCard from "../menu-card/menu-card.component";
import './home.style.scss';




const Home = () => {

    const receptList = [
        {

            id: "1",
            informations: {
                receptName: "Miracoli",
                receptLink: "https://www.chefkoch.de/rezepte/446511136906689/Tomatensauce-a-la-Miracoli.html",

            },
            ingredients: {
                0: {
                    ingredientName: "Bread",
                    value: "100g",
                },
                1: {
                    ingredientName: "Banana",
                    value: "1Stk.",
                }
            }
            ,
        }, {

            id: "2",
            informations: {
                receptName: "Test2",
                receptLink: "https://www.chefkoch.de/rezepte/446511136906689/Tomatensauce-a-la-Miracoli.html",

            },
            ingredients: {
                0: {
                    ingredientName: "Test2",
                    value: "200g",
                },
                1: {
                    ingredientName: "Test2",
                    value: "2Stk.",
                }
            }
        }




    ];
    return (
        <div>
            <div className="menu-card-container">
                <div className="menu-card-big classic-card">
                    <h2>+</h2>
                </div>
                <Link to="list" className="menu-card-big classic-card">
                    <h2>My Shoppinglist</h2>
                </Link>
                {receptList.map((receptInfo) => (
                    <MenuCard key={receptInfo.id} recept={receptInfo} />
                ))}

            </div>

        </div>
    )
}

export default Home;