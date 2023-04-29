import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import MenuCard from "../menu-card/menu-card.component";
import './home.style.scss';
import Popup from "../popup/popup.component";
import axios from 'axios';
import { Configuration, OpenAIApi } from "openai";



const Home = () => {

    const [receptList, setReceptList] = useState([
        {
            id: "0",
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
            id: "1",
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
        },
        {
            id: "2",
            informations: {
                receptName: "Test3",
                receptLink: "https://www.einfachbacken.de/rezepte/pfannkuchen-das-schnelle-grundrezept",
                receptImage: "https://www.einfachbacken.de/sites/einfachbacken.de/files/styles/700_530/public/2019-01/pfannkuchen.jpg?h=a1e1a043&itok=c-NaRLDC"
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

    const handleAddRecept = async () => {
        const htmlCode = await htmlExtract(newReceptLink);
        const table = findTable(htmlCode);
        // Extract ingredients from table rows
        const ingredients = getIngredients(table);

        const imgLink = findImageSrc(htmlCode);

        const h1 = findH1(htmlCode);
        console.log(h1);
        console.log(imgLink);
        console.log(ingredients);

        const newRecept = {
            id: `${receptList.length}`,
            informations: {
                receptName: h1,
                receptLink: newReceptLink,
                receptImage: imgLink
            },
            ingredients: ingredients.map((ingredient, index) => ({
                ingredientName: ingredient.name,
                value: ingredient.amount,
                id: index.toString()
            }))
        };

        setReceptList([...receptList, newRecept]);
        setNewReceptLink('');
        setShowPopup(false);
    };

    const onClickMenuCardHandler = async (receptInfo) => {
        await htmlExtract(receptInfo.informations.receptLink);
    }

    const htmlExtract = async (link) => {
        try {
            const url = link;
            const response = await axios.get(url);
            const htmlCode = response.data;
            return htmlCode;
            // Find table with class 'ingredients table-header'
        } catch (error) {
            console.log(error);
        }
    };

    const findTable = (htmlCode) => {
        // Find table with class 'ingredients table-header'
        const parser = new DOMParser();
        const html = parser.parseFromString(htmlCode, "text/html");
        return html.querySelector("table.ingredients.table-header");
    }

    const getIngredients = (table) => {
        // Extract ingredients from table rows
        const rows = table.querySelectorAll("tbody tr");
        const ingredients = Array.from(rows).map((row) => {
            const cols = row.querySelectorAll("td");
            const amount = cols[0].textContent.trim().replace(/\s+/g, "");
            const name = cols[1].querySelector("span").textContent.trim();
            return { amount, name };
        });

        return ingredients;
    }

    const findImageSrc = (htmlCode) => {
        const parser = new DOMParser();
        const html = parser.parseFromString(htmlCode, "text/html");
        const imgElement = html.querySelector("img.i-amphtml-fill-content.i-amphtml-replaced-content");
        return imgElement ? imgElement.getAttribute("src") : null;
    }

    const findH1 = (htmlCode) => {
        const parser = new DOMParser();
        const html = parser.parseFromString(htmlCode, "text/html");
        const titleElement = html.querySelector("h1");
        if (titleElement) {
            return titleElement.textContent;
        }
        return null;
    };


    /*i-amphtml-fill-content i-amphtml-replaced-content*/



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
                    <MenuCard to="list" key={receptInfo.id} recept={receptInfo} click={onClickMenuCardHandler} />
                ))}


            </div>

        </div>
    )
}

export default Home;