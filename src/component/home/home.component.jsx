import { Link } from "react-router-dom";
import { useState } from "react";
import MenuCard from "../menu-card/menu-card.component";
import './home.style.scss';
import Popup from "../popup/popup.component";
import axios from 'axios';
import { Configuration, OpenAIApi } from "openai";
const API_KEY = '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';



const Home = () => {

    const htmltest = `<div class="media--hero">
    <figure class="media--hero__image"><a href="https://www.chefkoch.de/rezepte/1417641246603822/Spargel-aus-dem-Ofen-ideal-fuer-Gaeste.html"><img src="https://www.chefkoch.de/magazin/sites/default/files/styles/hero/public/chefkoch/67/Spargel_aus_dem_Ofen_598.jpg" width="795" height="477" alt="Spargel klassisch: Rezept mit Hollandaise und Karfotteln"></a><figcaption><p>(Foto: CK_Print-Magazin)</p><a href="https://www.chefkoch.de/rezepte/1417641246603822/Spargel-aus-dem-Ofen-ideal-fuer-Gaeste.html">Zum Rezept: Spargel aus dem Ofen</a></figcaption></figure>
  </div>`;
    const [receptList, setReceptList] = useState([
        {
            id: "1",
            informations: {
                receptName: "Miracoli",
                receptLink: "https://www.chefkoch.de/rezepte/446511136906689/Tomatensauce-a-la-Miracoli.html",
                receptImage: "https://img.chefkoch-cdn.de/rezepte/446511136906689/bilder/697035/crop-642x428/tomatensauce-a-la-miracoli.jpg"
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
        },
        {
            id: "2",
            informations: {
                receptName: "Test2",
                receptLink: "https://www.chefkoch.de/rezepte/1109971217065453/Shakshuka.html",
                receptImage: "https://img.chefkoch-cdn.de/rezepte/1109971217065453/bilder/1085864/crop-642x428/shakshuka.jpg"
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
    ]);


    const [showPopup, setShowPopup] = useState(false);
    const [newReceptLink, setNewReceptLink] = useState('');


    function handleCardClick() {
        if (showPopup === false)
            setShowPopup(true);
        else
            setShowPopup(false);
    }

    const handleAddRecept = () => {
        const newRecept = {
            id: (receptList.length + 1).toString(),
            informations: {
                receptName: 'New Recept',
                receptLink: newReceptLink
            },
            ingredients: {}
        };
        setReceptList([...receptList, newRecept]);
        setNewReceptLink('');
        setShowPopup(false);
    };


    const onClickMenuCardHandler = async (receptInfo) => {
        try {
            const url = receptInfo.informations.receptLink;
            console.log(url);
            const response = await axios.get(url);
            const htmlCode = response.data;
            const imageUrl = await getRecipeIngredients(htmlCode);
            console.log(imageUrl);
        } catch (error) {
            console.log(error);
        }
    };


    const getRecipeIngredients = (htmlCode) => {
        const $ = cheerio.load(htmlCode);
        const ingredientsTable = $('table.ingredients tbody');
        const ingredients = [];

        ingredientsTable.find('tr').each((i, el) => {
            const amount = $(el).find('.td-left span').text().trim();
            const name = $(el).find('.td-right span').text().trim();
            ingredients.push({ amount, name });
        });

        return ingredients;
    };

    const cheerio = require('cheerio');

    const getRecipeImageUrl = (htmlCode) => {
        const $ = cheerio.load(htmlCode);
        const sizer = $('i-amphtml-sizer').html(); // Inhalt des <i-amphtml-sizer>-Tags
        const regex = /<img[^>]+src="([^">]+)/; // Regulärer Ausdruck zum Extrahieren des Bild-Links
        const match = regex.exec(sizer);
        if (match && match.length > 1) {
            return match[1]; // Das zweite Element des Matches sollte der Bild-Link sein
        } else {
            return null; // Falls kein Bild gefunden wurde, null zurückgeben
        }
    }



    return (
        <div>
            <div className="menu-card-container">
                <div onClick={handleCardClick} className="menu-card-big classic-card">
                    <h2>+</h2>
                </div>
                {showPopup && <Popup
                    onClose={() =>
                        setShowPopup(false)}
                    onAdd={handleAddRecept}
                    value={newReceptLink}
                    onChange={setNewReceptLink} />}
                <Link to="list" className="menu-card-big classic-card">
                    <h2>My Shoppinglist</h2>
                </Link>
                {receptList.map((receptInfo) => (
                    <MenuCard key={receptInfo.id} recept={receptInfo} click={onClickMenuCardHandler} />
                ))}

            </div>

        </div>
    )
}

export default Home;