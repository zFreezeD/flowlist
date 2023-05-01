import { Routes, Route, Link } from 'react-router-dom';
import ShoppingListContainer from './component/shopping-list-container/shopping-list-container.component';
import Home from './component/home/home.component';
import './App.scss';
import RecipePage from './component/recipe-page/recipe-page.component';
import { createContext, useState } from 'react';

export const RecipeContext = createContext();

function App() {

  const [selectedRecipe, setSelectedRecipe] = useState(null);

  return (

    <div className="App">
      <div>
        <Link to="/">Home</Link>
      </div>
      <RecipeContext.Provider value={{ selectedRecipe, setSelectedRecipe }}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='list' element={<ShoppingListContainer />} />
          <Route path='recipe' element={<RecipePage />}></Route>
        </Routes>
      </RecipeContext.Provider>
    </div >
  );
}

export default App;

export const Context = createContext('Default Value');