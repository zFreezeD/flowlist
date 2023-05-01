import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import MenuCard from "../menu-card/menu-card.component";
import './home.style.scss';
import Popup from "../popup/popup.component";
import axios from 'axios';
import { firebaseGetRecipe, firebaseSaveRecipe } from "../../utils/firebase/firebase.utils";
import { useContext } from "react";
import { RecipeContext } from "../../App";
import { v4 as uuidv4 } from 'uuid';
import deleteIcon from '../../assets/img/delete-16.png'
const Home = () => {

    const [receptList, setReceptList] = useState([
    ]);


    const [showPopup, setShowPopup] = useState(false);
    const [newReceptLink, setNewReceptLink] = useState('');
    const { setSelectedRecipe } = useContext(RecipeContext);
    const [deleteReady, setDeleteReady] = useState(false);
    const [deleteArray, setDeleteArray] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const recipes = await firebaseGetRecipe();
            setReceptList(recipes);
            console.log("update");
        };

        fetchData();
    }, []);

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
            id: uuidv4(),
            informations: {
                receptName: h1,
                receptLink: newReceptLink,
                receptImage: imgLink
            },
            ingredients: ingredients.map((ingredient, index) => ({
                ingredientName: ingredient.name,
                value: ingredient.amount,
                id: uuidv4()
            }))
        };

        setReceptList([...receptList, newRecept]);
        setNewReceptLink('');
        const uploadArray = receptList;
        uploadArray.push(newRecept);
        await firebaseSaveRecipe(uploadArray);
        setShowPopup(false);
    };

    const onClickMenuCardHandler = async (receptInfo) => {
        if (deleteReady) {
            console.log("stop");
            return;
        }

        console.log("recept ", receptInfo);
        setSelectedRecipe(receptInfo);
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

    const onDeleteButton = () => {
        if (deleteReady) {
            setDeleteArray([]);
            setDeleteReady(false);
        } else {
            setDeleteArray([]);
            setDeleteReady(true);
        }
    }

    const acceptDelete = async () => {
        console.log("delete", deleteArray);
        console.log("all", receptList);
        setDeleteReady(false);

        var newArray = receptList;
        for (let i = 0; i < newArray.length; i++) {
            for (let x = 0; x < deleteArray.length; x++) {
                if (newArray[i].id == deleteArray[x]) {
                    newArray.splice(i, 1);
                }

            }
        }

        await firebaseSaveRecipe(newArray);
        setReceptList(newArray);
    }

    const addReceptToDelete = (receptid) => {
        if (deleteReady) {
            if (deleteArray.includes(receptid)) {
                const newArray = [...deleteArray];
                const index = newArray.indexOf(receptid);
                newArray.splice(index, 1);
                setDeleteArray(newArray);
            } else {
                const newArray = [...deleteArray];
                newArray.push(receptid);
                setDeleteArray(newArray);
            }
        }
    };

    /*i-amphtml-fill-content i-amphtml-replaced-content*/



    return (
        <div className="home-main">
            <h2>Welcome to Flowlist!</h2>
            <div className="menu-card-container">
                {showPopup && <Popup
                    onClose={() =>
                        setShowPopup(false)}
                    onAdd={handleAddRecept}
                    value={newReceptLink}
                    onChange={setNewReceptLink} />}
                <Link to="list" className="menu-card-big classic-card">
                    <h2>My Shoppinglist</h2>
                </Link>
                {receptList ? receptList.map((receptInfo) => (
                    <MenuCard
                        key={receptInfo.id}
                        recept={receptInfo}
                        click={onClickMenuCardHandler}
                        deleteProp={addReceptToDelete}
                    />
                )) : null}


            </div>
            <div className="home-bar-container">
                <button onClick={deleteReady ? acceptDelete : handleCardClick} className=" btn-primary home-addbar">
                    {deleteReady ? `Delete ${deleteArray.length} Recipes` : "Add new recipe"}
                </button>
                <button className=" btn-primary home-deletebar" onClick={onDeleteButton}>
                    <img src={deleteIcon} />
                </button>
            </div>

        </div>
    )
}

export default Home;