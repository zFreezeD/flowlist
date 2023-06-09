import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'
import { doc, setDoc } from 'firebase/firestore';
import { collection, getDocs } from 'firebase/firestore';



// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA-gbn0Zw-2TZHAzJehYi131bk37oipVA8",
    authDomain: "flowlist-af486.firebaseapp.com",
    projectId: "flowlist-af486",
    storageBucket: "flowlist-af486.appspot.com",
    messagingSenderId: "70219627903",
    appId: "1:70219627903:web:c5fb57bd0c1a6db0606e4a"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);


export const firebaseGetRecipe = async () => {
    const recipeCollectionRef = collection(db, 'recipe');
    const recipeSnapshot = await getDocs(recipeCollectionRef, 'janrecipt');
    const recipe = recipeSnapshot.docs.map((doc) => doc.data());
    const [{ recipeData }] = recipe;
    return recipeData;
}

export const firebaseSaveRecipe = async (recipeData) => {
    try {
        const recipeDocRef = doc(db, 'recipe', 'janrecipt');
        console.log("receipeDocRef: ", recipeDocRef);
        await setDoc(recipeDocRef, { recipeData });
    } catch (error) {
        console.log(error);
    }
}

export const firebaseGetShoppingList = async () => {
    const recipeCollectionRef = collection(db, 'shopping-list');
    const recipeSnapshot = await getDocs(recipeCollectionRef, 'janshoppinglist');
    var recipe = recipeSnapshot.docs.map((doc) => doc.data());
    if (recipe.length === 0) {
        const ingredient = []
        return ingredient;
    }
    recipe = recipe[0].listArray;
    return recipe;
}

export const firebaseSaveShoppingList = async (array, needFirebaseArray) => {
    var firebaseArray = [];
    if (needFirebaseArray === true)
        firebaseArray = await firebaseGetShoppingList();
    var listArray = [];
    if (firebaseArray.length === 0) {
        listArray = array;
    }
    else {
        listArray = [...array, ...firebaseArray];
    }

    try {
        const recipeDocRef = doc(db, 'shopping-list', 'janshoppinglist');
        await setDoc(recipeDocRef, { listArray });
    } catch (error) {
        console.log(error);
        alert(error);
    }
}