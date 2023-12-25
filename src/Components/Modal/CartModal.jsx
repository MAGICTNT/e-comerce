import {forwardRef, useImperativeHandle, useRef} from "react";
import {createPortal} from "react-dom";
import Cart from "./Cart";
import TiketRight from "../tiket_right/TiketRight";

/**
 * Composant de modal pour afficher le panier.
 *
 * @component
 * @param {Object} props - Les propriétés du composant.
 * @param {React.Ref} ref - Référence pour accéder impérativement aux méthodes de la modal.
 * @returns {JSX.Element} - Le composant de modal.
 */
const CartModal = forwardRef(function Modal({}, ref){

    const dialog = useRef();

    useImperativeHandle(ref, () => {
        return {
            open: () =>{
                dialog.current.showModal();
            }
        }
    })

    return createPortal(
        <dialog id="modal" ref={dialog}>
            <h2>Panier</h2>
            <TiketRight/>
            <form method="dialog">
                <button>Fermer</button>
            </form>
        </dialog>,document.getElementById("modal-root")
    )
})

export default CartModal;