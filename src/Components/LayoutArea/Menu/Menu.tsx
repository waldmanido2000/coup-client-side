import { Link } from "react-router-dom";
import "./Menu.css";

function Menu(): JSX.Element {
    return (
        <div className="Menu">
            <Link className="Hide" to={'/'} >Home</Link>
            <Link className="Hide" to={'About'} >About</Link>
        </div>
    );
}

export default Menu;
