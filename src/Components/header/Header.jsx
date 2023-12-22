import Radio from "../form/Radio";
import './header.css'
const Header = ({choixRegime, handleChoix}) => {

    return (
        <header className="header">
            <p className="headerLogo">E-SHOP</p>
            <div className="headerCheckbox">
                <Radio checked={choixRegime} value="all" onChange={handleChoix} />
                <Radio checked={choixRegime} value="carnivore" onChange={handleChoix} />
                <Radio checked={choixRegime} value="vegan" onChange={handleChoix} />
                <Radio checked={choixRegime} value="pescetarien" onChange={handleChoix} />
                <Radio checked={choixRegime} value="végétarien" onChange={handleChoix} />
                <Radio checked={choixRegime} value="fruits de mer" onChange={handleChoix} />
            </div>
        </header>
    );
};

export default Header;