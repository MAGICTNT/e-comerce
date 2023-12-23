
import {useContext} from "react";
import {PanierContext} from "../../Context/paniper-context/Panier-context";

const Cart = () => {

    const {items,updateItemQuantity} = useContext(PanierContext)
    console.log(items.reduce((acc,item) => acc+item.price * item.quantity,0))
    const totalAmount = items.reduce((acc,item) => acc+item.price * item.quantity,0);
    const calculateTotalPrice = (cart, products) => {
        console.log("pro", products.map((p) => p.price))
        const totalPrice = cart.reduce((acc, cartItem) => {
            const product = products.find(p => p.id === cartItem.productId);
            console.log("total product: ",product)
            if (product) {
                console.log("product.price", product.price)
                return acc + product.price * cartItem.quantity;
            }
            console.log("acc",acc)
            return acc;
        }, 0);
        console.log("totalPrice",totalPrice)
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