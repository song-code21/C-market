import React, { useState } from 'react'
import CartItem from '../components/CartItem'
import OrderSummary from '../components/OrderSummary'

export default function ShoppingCart({ items, cartItems, handleDelete }) {
  const [checkedItems, setCheckedItems] = useState(cartItems.map((el) => el.id))
  const [isQuantity, setQuantity] = useState('')

  const handleCheckChange = (checked, id) => {
    if (checked) {
      setCheckedItems([...checkedItems, id]);
    }
    else {
      setCheckedItems(checkedItems.filter((el) => el !== id));
    }
  };

  const handleAllCheck = (checked) => {
    if (checked) {
      setCheckedItems(cartItems.map((el) => el.id))
    }
    else {
      setCheckedItems([]);
    }
  };

  const handleQuantityChange = (quantity, id) => {
    for(let el of cartItems) {
      if(el.id === id) {
        el.quantity = quantity;
        setQuantity(quantity);
      }
    }
  }

  // const handleDelete = (itemId) => {
  //   setCheckedItems(checkedItems.filter((el) => el !== itemId))
  // }

  const getTotal = () => {
    let cartIdArr = cartItems.map((el) => el.id)
    let total = {
      price: 0,
      quantity: 0,
    }
    for (let i = 0; i < cartIdArr.length; i++) {
      if (checkedItems.indexOf(cartIdArr[i]) > -1) {
        let quantity = cartItems[i].quantity
        let price = cartItems[i].price

        total.price = total.price + quantity * price
        total.quantity = total.quantity + quantity
      }
    }
    return total
  }

  // const renderItems = items.filter((el) => cartItems.map((el) => el.itemId).indexOf(el.id) > -1)
  const total = getTotal()

  return (
    <div id="item-list-container">
      <div id="item-list-body">
        <div id="item-list-title">장바구니</div>
        <span id="shopping-cart-select-all">
          <input
            type="checkbox"
            checked={
              checkedItems.length === cartItems.length ? true : false
            }
            onChange={(e) => handleAllCheck(e.target.checked)} >
          </input>
          <label >전체선택</label>
        </span>
        <div id="shopping-cart-container">
          {!cartItems.length ? (
            <div id="item-list-text">
              장바구니에 아이템이 없습니다.
            </div>
          ) : (
              <div id="cart-item-list">
                {cartItems.map((item, idx) => { //itemListContainer.js에서 클릭하면 배열에 추가-> 그 배열로 랜더링 
                  const quantity = cartItems.quantity
                  return <CartItem
                    key={idx}
                    handleCheckChange={handleCheckChange}
                    handleQuantityChange={handleQuantityChange}
                    handleDelete={handleDelete}
                    item={item}
                    checkedItems={checkedItems}
                    quantity={quantity}
                    isQuantity={isQuantity}
                  />
                })}
              </div>
            )}
          <OrderSummary total={!isNaN(total.price) ? total.price : 0} totalQty={!isNaN(total.quantity) ? total.quantity : 0} />
        </div>
      </div >
    </div>
  )
}
