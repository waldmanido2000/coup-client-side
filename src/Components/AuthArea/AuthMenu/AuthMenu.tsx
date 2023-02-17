import { Link } from "react-router-dom";
import "./AuthMenu.css";

function AuthMenu(): JSX.Element {
    const token = "";
    return (
        <div className="AuthMenu">
            {(token)
                ? <Link to={'logout'} >logout here</Link>
                : <Link to={'login'} >login here</Link>}
        </div>
    );
}

export default AuthMenu;

<Link to={'login'} >login here</Link>