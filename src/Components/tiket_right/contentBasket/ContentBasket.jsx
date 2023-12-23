import React from 'react';
import './ContentBasket.css'
const ContentBasket = ({item,up,down,deleteAll}) => {
    return (
        <div className="contentBasket">
            <div className="contentBasketTop">
                <p className="contentBasketLabel">
                    {item.name}
                </p>
                <button className="contentBasketbuttonDelete" onClick={() => deleteAll(item.id)}>
                    <img width="30" height="30" src="https://img.icons8.com/ios-glyphs/30/trash--v1.png"
                         alt="trash--v1"/>
                </button>
            </div>

            <div className="contentBasketItem">
                <p className="contentBasketPrix">prix {(item.price * item.quantity).toFixed(2)} €</p>
                <div className="contentBasketQuantity">
                    <p>qty: </p>
                    <button className="contentBasketbuttonUp" onClick={() => up(item.id, 1)}>+</button>
                    <p>{item.quantity}</p>
                    <button className="contentBasketbuttonDown" onClick={() => down(item.id, 1)}>-</button>
                </div>
            </div>
            <hr />
        </div>
    );
};

export default ContentBasket;