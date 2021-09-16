import React from 'react';
import Item from '../components/Item';

function ItemListContainer({ items, handleClick }) {
  // const handleClick = () => { } //클릭이벤트 구현 -> 클릭하면 shoppingcart페이지에 아이템이 추가되어야 함
  return (
    <div id="item-list-container">
      <div id="item-list-body">
        <div id="item-list-title">쓸모없는 선물 모음</div>
        {items.map((item, idx) => <Item item={item} key={idx} handleClick={handleClick} />)}
      </div>
    </div>
  );
}

export default ItemListContainer;
