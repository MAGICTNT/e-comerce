import React, { useContext } from 'react';
import { PanierContext } from "../../Context/paniper-context/Panier-context";
import './TiketRight.css';
import ContentBasket from "./contentBasket/ContentBasket";

/**
 * Composant représentant le côté droit du ticket, affichant le contenu du panier.
 *
 * @component
 * @returns {JSX.Element} - Le composant TiketRight.
 */
const TiketRight = () => {
    /**
     * Utilisation du contexte du panier pour accéder aux éléments du panier et aux fonctions de mise à jour.
     * @type {Object}
     * @property {Array} items - Liste des articles dans le panier.
     * @property {function} deleteItemToCart - Fonction pour supprimer un article du panier.
     * @property {function} addMoreItemToCart - Fonction pour augmenter la quantité d'un article dans le panier.
     * @property {function} reductItemToCart - Fonction pour réduire la quantité d'un article dans le panier.
     */
    const { items, deleteItemToCart, addMoreItemToCart, reductItemToCart } = useContext(PanierContext);

    /**
     * Calcul du montant total du panier en fonction des prix et quantités des articles.
     * @type {number}
     */
    const total = items.reduce((cc, items) => cc + items.price * items.quantity, 0);

    /**
     * Rendu du composant TiketRight.
     */
    return (
        <div className="tiketRight">
            <p className="tiketRightTotal"><strong>Total : {total.toFixed(2)} €</strong></p>
            <div className="tiketRightContaine">
                <div className="tiketRightFood">
                    {items.length === 0
                        ? 'Panier vide'
                        : items.map((item) => (
                            <ContentBasket
                                key={item.id}
                                item={item}
                                up={addMoreItemToCart}
                                down={reductItemToCart}
                                deleteAll={deleteItemToCart}
                            />
                        ))}
                </div>
            </div>
        </div>
    );
};

export default TiketRight;
