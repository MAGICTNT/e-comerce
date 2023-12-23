
import './header.css'
import {useContext, useRef} from "react";
import {PanierContext} from "../../Context/paniper-context/Panier-context";
import CartModal from "../Modal/CartModal";
const Header = () => {
    const {items} = useContext(PanierContext)
    const modalRef = useRef()

    const handleOpenCart = () => {
        modalRef.current.open();
    }
    return (
        <>
            <CartModal ref={modalRef}  />
            <header className="header">
                <div className="headerLogo"><p className="">E-SHOP</p></div>

                <div className="headerPanier">

                    <img onClick={handleOpenCart} width="32" height="32"
                         src="https://img.icons8.com/puffy-filled/32/experimental-shopping-basket-puffy-filled.png"
                         alt="experimental-shopping-basket-puffy-filled"/>
                    <p className="headerPanierConteur">{items.length > 99 ? "99+" : items.length}</p>

                </div>
            </header>
        </>
    );
};

export default Header;