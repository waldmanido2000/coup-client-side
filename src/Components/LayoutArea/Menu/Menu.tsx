import { Link } from "react-router-dom";
import AuthMenu from "../../AuthArea/AuthMenu/AuthMenu";
import "./Menu.css";

function Menu(): JSX.Element {
    return (
        <div className="Menu">
            <Link to={'/'} >Home</Link>
            <Link to={'about'} >About</Link>
            <Link to={'developer'} >developer</Link>
            <AuthMenu/>
        </div>
    );
}

export default Menu;
