import './App.css';
import {FOOD_MENU} from "./Components/FOOD";
import CartFood from "./Components/cart_food/CartFood";
import Header from "./Components/header/Header";
import { useState} from "react";
import { PanierContextProvider} from "./Context/paniper-context/Panier-context";
import TiketRight from "./Components/tiket_right/TiketRight";


function App() {
    const [choix, setChoix]= useState("all")
    const handleAlimentationChange = (event) => {
        setChoix(event.target.value);
    };
    return (
      <PanierContextProvider>
          <Header choixRegime={choix} handleChoix={handleAlimentationChange}/>
          <div className="container">
              <div className="container-food">
                  {FOOD_MENU.map((food) => food.regime == choix ? <CartFood
                          key={food.id}
                          id={food.id}
                          label={food.name}
                          img={food.photo}
                          ingredients={food.ingredient}
                          prix={food.prix}
                      />
              : choix === "all"  ? <CartFood
                              key={food.id}
                              id={food.id}
                              label={food.name}
                              img={food.photo}
                              ingredients={food.ingredient}
                              prix={food.prix}
                          />
                          : ""

                  )}
              </div>
              <div className="ticket">
                  <TiketRight/>
              </div>
          </div>

      </PanierContextProvider>
    );
}

export default App;
