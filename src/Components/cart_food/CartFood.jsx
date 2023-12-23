import './CartFood.css'
import {PanierContext} from "../../Context/paniper-context/Panier-context";
import {useContext} from "react";

const CartFood = ({id, label, img="http://via.placeholder.com/220x140", ingredients, prix}) => {

    const {addItemToCart} = useContext(PanierContext);

    const numberIngredient = ingredients.length
    return (
        <div className="cart_food">
            <p className="cart_food_label">{label}</p>
            <img className="cart_food_img" src={require(`../../assets/img/${img}`)} alt=""/>
            <p className="cart_food_ingredient">{
                ingredients.map((ingredients, i) =>
                    i !== (numberIngredient - 1) ? ingredients + ", " : ingredients)
            }</p>
            <div className="cart_food_footer">
                <p className="cart_food_prix"><strong>{prix}€</strong></p>
                <button onClick={() => addItemToCart(id)} className="cart_food_button">ajouter</button>
            </div>
        </div>
    )
}

export default CartFood;