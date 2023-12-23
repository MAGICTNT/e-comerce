import React, {useContext} from 'react';
import {PanierContext} from "../../Context/paniper-context/Panier-context";
import './TiketRight.css'
import ContentBasket from "./contentBasket/ContentBasket";

const TiketRight = () => {
    const {items, deleteItemToCart, addMoreItemToCart, reductItemToCart} = useContext(PanierContext)
    const total = items.reduce((cc,items) => cc+items.price * items.quantity,0)
    return (
            <div className="tiketRight">
                <p className="tiketRightTotal"><strong>total : {total.toFixed(2)} €</strong></p>
                <div className="tiketRightContaine">
                    <div className="tiketRightFood">{items.length === 0 ? 'panier vide' : items.map((item) =>
                        <ContentBasket
                            key={item.id}
                            item={item}
                            up={addMoreItemToCart}
                            down={reductItemToCart}
                            deleteAll={deleteItemToCart}
                        />

                    )}</div>


                </div>

            </div>
    );
};

export default TiketRight;