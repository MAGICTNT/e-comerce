import {createContext, useEffect, useReducer} from "react";
import {FOOD_MENU} from "../../Components/FOOD";
import {useCookies} from "react-cookie";
// eslint-disable-next-line no-unused-vars
import {AJOUTER_DANS_PANIER, SUPPRIMER_DU_PANIER, PLUS_DANS_PANIER, MOINS_DANS_PANIER} from "../../GlobalVariable";
/**
 * Contexte de panier pour gérer les articles dans le panier.
 *
 * @typedef {Object} PanierContextType
 * @property {Array} items - Liste des articles dans le panier.
 * @property {function} addItemToCart - Fonction pour ajouter un article au panier.
 * @property {function} addMoreItemToCart - Fonction pour augmenter la quantité d'un article dans le panier.
 * @property {function} reductItemToCart - Fonction pour réduire la quantité d'un article dans le panier.
 * @property {function} deleteItemToCart - Fonction pour supprimer un article du panier.
 */

/**
 * @type {PanierContextType}
 */
export const PanierContext = createContext({
    items: [],
    addItemToCart: () => {
    },
    addMoreItemToCart: () => {
    },
    reductItemToCart: () => {
    },
    deleteItemToCart: () => {
    },
})

/**
 * Fonction pour ajouter un article au panier.
 *
 * @param {Object} existingElement - L'élément existant dans le panier.
 * @param {number} existingElementItem - L'indice de l'élément existant dans la liste du panier.
 * @param {Array} updateShopingItem - Liste mise à jour des articles dans le panier.
 * @param {Object} action - L'action spécifiée pour la mise à jour du panier.
 * @returns {Object} - Nouveau state du panier.
 */
function addToPanier(existingElement, existingElementItem, updateShopingItem, action) {
    if (existingElement) {
        // si element dans le panier
        const updateProductData = {
            ...existingElement,
            quantity: existingElement.quantity + 1
        }
        updateShopingItem[existingElementItem] = updateProductData
    } else {
        const item = FOOD_MENU.find(
            (food) => food.id === action.payload.productId
        )

        if (item) {
            updateShopingItem.push({
                id: item.id,
                name: item.name,
                price: item.prix,
                quantity: 1,
            })
        }
    }
    return {
        items: updateShopingItem
    }
}

/**
 * Fonction pour supprimer un article du panier.
 *
 * @param {Object} existingElement - L'élément existant dans le panier.
 * @param {number} existingElementItem - L'indice de l'élément existant dans la liste du panier.
 * @param {Array} updateShopingItem - Liste mise à jour des articles dans le panier.
 * @param {Object} action - L'action spécifiée pour la mise à jour du panier.
 * @returns {Object} - Nouveau state du panier.
 */
function deleteToPanier(existingElement, existingElementItem, updateShopingItem, action) {
    const updatedItems = updateShopingItem.filter(item => item.id !== action.payload.productId);
    return {
        items: updatedItems
    }
}

/**
 * Fonction pour augmenter la quantité d'un article dans le panier.
 *
 * @param {Object} existingElement - L'élément existant dans le panier.
 * @param {number} existingElementItem - L'indice de l'élément existant dans la liste du panier.
 * @param {Array} updateShopingItem - Liste mise à jour des articles dans le panier.
 * @param {Object} action - L'action spécifiée pour la mise à jour du panier.
 * @returns {Object} - Nouveau state du panier.
 */
function addMoreToPanier(existingElement, existingElementItem, updateShopingItem, action) {
    const updatedData = {
        ...updateShopingItem[existingElementItem],
    }
    updatedData.quantity += action.payload.number
    updateShopingItem[existingElementItem] = updatedData
    return {
        items: updateShopingItem
    }
}

/**
 * Fonction pour réduire la quantité d'un article dans le panier.
 *
 * @param {Object} existingElement - L'élément existant dans le panier.
 * @param {number} existingElementItem - L'indice de l'élément existant dans la liste du panier.
 * @param {Array} updateShopingItem - Liste mise à jour des articles dans le panier.
 * @param {Object} action - L'action spécifiée pour la mise à jour du panier.
 * @returns {Object} - Nouveau state du panier.
 */
function reductToPanier(existingElement, existingElementItem, updateShopingItem, action) {
    const updatedData = {
        ...updateShopingItem[existingElementItem],
    }
    updatedData.quantity -= action.payload.number
    if (updatedData.quantity <= 0) {
        const deleteData = updateShopingItem.filter(item => item.id !== action.payload.productId)
        return {
            items: deleteData
        }
    } else {
        updateShopingItem[existingElementItem] = updatedData
    }
    return {
        items: updateShopingItem
    }
}

/**
 * Réducteur du panier qui gère les différentes actions de mise à jour du panier.
 *
 * @param {Object} state - État actuel du panier.
 * @param {Object} action - L'action spécifiée pour la mise à jour du panier.
 * @returns {Object} - Nouveau state du panier.
 */
const cartReducer = (state, action) => {
    const updateShopingItem = [...state.items];
    const existingElementItem = updateShopingItem.findIndex((item) => item.id === action.payload.productId)
    const existingElement = updateShopingItem[existingElementItem]
    switch (action.type) {
        case AJOUTER_DANS_PANIER:
            return addToPanier(existingElement, existingElementItem, updateShopingItem, action);
        case SUPPRIMER_DU_PANIER:
            return deleteToPanier(existingElement, existingElementItem, updateShopingItem, action);
        case PLUS_DANS_PANIER:
            return addMoreToPanier(existingElement, existingElementItem, updateShopingItem, action);
        case MOINS_DANS_PANIER:
            return reductToPanier(existingElement, existingElementItem, updateShopingItem, action);
        default:
            return state
    }
}

/**
 * Fournit le contexte du panier à l'ensemble de l'application.
 *
 * @param {Object} props - Propriétés du composant.
 * @param {React.ReactNode} props.children - Les composants enfants encapsulés par ce contexte.
 * @returns {JSX.Element} - Composant enveloppé dans le contexte du panier.
 */
export const PanierContextProvider = ({children}) => {
    const [cookies, setCookie] = useCookies(["panier"]);
    const [cartState, cartDispatch] = useReducer(cartReducer, {
        items: cookies.panier || [],
    });
    useEffect(() => {
        // Sauvegarder le panier dans les cookies à chaque modification
        setCookie("panier", cartState.items, { sameSite: 'None', secure: true });
    }, [cartState.items, setCookie]);

    const handleAddToProductToCart = (productId) => {
        cartDispatch({
            type: AJOUTER_DANS_PANIER,
            payload: {
                productId: productId
            }
        })
    }
    const handleDeleteToProductToCart = (productId) => {
        cartDispatch({
            type: SUPPRIMER_DU_PANIER,
            payload: {
                productId: productId
            }
        })
    }
    const handleAddMoreToProductToCart = (productId, number) => {
        cartDispatch({
            type: PLUS_DANS_PANIER,
            payload: {
                productId: productId,
                number: number
            }
        })
    }

    const handleReductToProductToCart = (productId, number) => {
        cartDispatch({
            type: MOINS_DANS_PANIER,
            payload: {
                productId: productId,
                number: number
            }
        })
    }

    const initValue = {
        items: cartState.items,
        addItemToCart: handleAddToProductToCart,
        deleteItemToCart: handleDeleteToProductToCart,
        addMoreItemToCart: handleAddMoreToProductToCart,
        reductItemToCart: handleReductToProductToCart,
    }

    return <PanierContext.Provider value={initValue}>
        {children}
    </PanierContext.Provider>
}
