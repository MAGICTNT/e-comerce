import React from 'react';
import './CartFood.css';
import { PanierContext } from "../../Context/paniper-context/Panier-context";
import { useContext } from "react";

const CartFood = ({ id, label, img = "http://via.placeholder.com/220x140", ingredients, prix }) => {

    const { items, addItemToCart, addMoreItemToCart, reductItemToCart } = useContext(PanierContext);

    const numberIngredient = ingredients.length;

    // Trouver l'élément correspondant dans le panier
    const cartItem = items.find(item => item.name === label && item.id === id);

    return (
        <div className="cart_food">
            <p className="cart_food_label">{label}</p>
            <img className="cart_food_img" src={require(`../../assets/img/${img}`)} alt="" />
            <p className="cart_food_ingredient">{
                ingredients.map((ingredient, i) =>
                    i !== (numberIngredient - 1) ? ingredient + ", " : ingredient)
            }</p>
            <div className="cart_food_footer">
                <p className="cart_food_prix"><strong>{prix}€</strong></p>

                {cartItem ? (
                    // Si l'article est dans le panier, afficher les boutons + et -
                    <div className="cart_food_quantity">
                        <button onClick={() => addMoreItemToCart(id, 1)}>+</button>
                        <span>{cartItem.quantity}</span>
                        <button onClick={() => reductItemToCart(id, 1)}>-</button>
                    </div>
                ) : (
                    // Sinon, afficher le bouton "ajouter"
                    <button onClick={() => addItemToCart(id)} className="cart_food_button">ajouter</button>
                )}
            </div>
        </div>
    );
}

export default CartFood;
