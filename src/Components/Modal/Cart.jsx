
import {useContext} from "react";
import {PanierContext} from "../../Context/paniper-context/Panier-context";

/**
 * Composant représentant le panier d'achat.
 *
 * @component
 */
const Cart = () => {

    const {items,updateItemQuantity} = useContext(PanierContext)
    const totalAmount = items.reduce((acc,item) => acc+item.price * item.quantity,0);

    /**
     * Calcul du montant total du panier en utilisant une fonction de calcul personnalisée.
     *
     * @param {Array} cart - Liste des articles dans le panier.
     * @param {Array} products - Liste complète des produits disponibles.
     * @returns {number} - Montant total du panier.
     */
    const calculateTotalPrice = (cart, products) => {
        const totalPrice = cart.reduce((acc, cartItem) => {
            const product = products.find(p => p.id === cartItem.productId);
            if (product) {
                return acc + product.price * cartItem.quantity;
            }
            return acc;
        }, 0);
        return totalPrice;
    };
    return(
        <div >
            {items.length === 0 && <p>panier vide</p> }
            {items.length > 0 &&

                <ul>
                    {items.map((item) =>
                        <li key={item.id}>
                            <p>{item.name}</p>
                            <div>
                                {/* eslint-disable-next-line no-undef */}
                                <button onClick={() => updateItemQuantity(item.id, -1)}>-</button>
                                <span>{item.quantity}</span>
                                <button onClick={() => updateItemQuantity(item.id, +1)}>+</button>
                            </div>
                        </li>
                    )
                    }
                </ul>
            }
            {items.length > 0 && (
                <p>Montant total: {" "}
                <strong>{totalAmount.toFixed(2)}Euro{totalAmount > 1 ? "s" : " "}</strong>
                </p>
            )}
        </div>
    )
}

export default Cart;