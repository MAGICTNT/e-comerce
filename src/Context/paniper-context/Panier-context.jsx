import {createContext, useReducer} from "react";
import {FOOD_MENU} from "../../Components/FOOD";

export const PanierContext = createContext({
    items: [],
    addItemToCart: () => {},
    addMoreItemToCart: () => {},
    reductItemToCart: () => {},
    deleteItemToCart: () => {},
})

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
        console.log("new item: ", item)

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
function deleteToPanier(existingElement, existingElementItem, updateShopingItem, action){
    const updatedItems = updateShopingItem.filter(item => item.id !== action.payload.productId);
    return {
        items: updatedItems
    }
}

function addMoreToPanier(existingElement, existingElementItem, updateShopingItem, action){
    const updatedData = {
        ...updateShopingItem[existingElementItem],
    }
    updatedData.quantity += action.payload.number
    updateShopingItem[existingElementItem] = updatedData
    return {
        items: updateShopingItem
    }
}
function reductToPanier(existingElement, existingElementItem, updateShopingItem, action){
    const updatedData = {
        ...updateShopingItem[existingElementItem],
    }
    updatedData.quantity -= action.payload.number
    if(updatedData.quantity <= 0){
        const deleteData = updateShopingItem.filter(item => item.id !== action.payload.productId)
        return {
            items:deleteData
        }
    }else{
        updateShopingItem[existingElementItem] = updatedData
    }
    return {
        items: updateShopingItem
    }
}

const cartReducer = (state, action) => {
    const updateShopingItem = [...state.items];
    const existingElementItem = updateShopingItem.findIndex((item) => item.id === action.payload.productId)
    const existingElement = updateShopingItem[existingElementItem]
    switch (action.type) {
        case "AJOUTER_DANS_PANIER":
            return addToPanier(existingElement,existingElementItem,updateShopingItem,action);
        case "SUPPRIMER_DU_PANIER":
            return deleteToPanier(existingElement,existingElementItem,updateShopingItem,action);
        case "PLUS_DANS_PANIER":
            return addMoreToPanier(existingElement,existingElementItem,updateShopingItem,action);
        case "MOINS_DANS_PANIER":
            return reductToPanier(existingElement,existingElementItem,updateShopingItem,action);
        default:
            return state
    }
}

export const PanierContextProvider = ({children}) => {

    const [cartState, cartDispatch] = useReducer(cartReducer, {
        items: [],
    });

    const handleAddToProductToCart = (productId) => {
        cartDispatch({
            type: "AJOUTER_DANS_PANIER",
            payload: {
                productId: productId
            }
        })
    }
    const handleDeleteToProductToCart = (productId) => {
        cartDispatch({
            type: "SUPPRIMER_DU_PANIER",
            payload: {
                productId: productId
            }
        })
    }
    const handleAddMoreToProductToCart = (productId , number) => {
        cartDispatch({
            type: "PLUS_DANS_PANIER",
            payload: {
                productId: productId,
                number: number
            }
        })
    }

    const handleReductToProductToCart = (productId, number) => {
        cartDispatch({
            type: "MOINS_DANS_PANIER",
            payload: {
                productId: productId,
                number: number
            }
        })
    }

    const handleUpToPanier = (productId,quantity) => {

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
