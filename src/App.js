import React, { useState } from 'react';
import Nav from './components/Nav';
import ItemListContainer from './pages/ItemListContainer';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import ShoppingCart from './pages/ShoppingCart';
import { initialState } from './assets/state';

function App() {

  const [items, setItems] = useState(initialState.items);
  const [cartItems, setCartItems] = useState([]);


  const handleClick = (e, id) => {
    const newItem = items.filter((el) => el.id === id);
    newItem[0].quantity = 1;
    setCartItems([...cartItems].concat(newItem))
    console.log(cartItems);
  }

  const handleDelete = (itemId) => {
    setCartItems(cartItems.filter((el) => el.id !== itemId))
  }
  return (
    <Router>
      <Nav cartItems={cartItems}/>
      <Switch>
        <Route exact={true} path="/">
          <ItemListContainer items={items} handleClick={handleClick}/>
        </Route>
        <Route path="/shoppingcart">
          <ShoppingCart cartItems={cartItems} items={items} handleDelete={handleDelete}/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
