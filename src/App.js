import { Routes, Route, Link } from 'react-router-dom';
import ShoppingListContainer from './component/shopping-list-container/shopping-list-container.component';
import Home from './component/home/home.component';
import './App.scss';






function App() {
  return (

    <div className="App">
    <div><Link to="/">Home</Link><Link to="list">To List</Link></div>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='list' element={<ShoppingListContainer />} />
      </Routes>
    </div>
  );
}

export default App;
