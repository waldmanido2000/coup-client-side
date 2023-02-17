import "./Header.css";
// import myImage from './src/Assets/logo.png';
import myImage from '../../../Assets/logo.png';
import AuthMenu from "../../AuthArea/AuthMenu/AuthMenu";

function Header(): JSX.Element {
    
    return (
        <div className="Header">
            <img src={myImage}/>
			<h1>Coup - revolutionizing coupons</h1>
        </div>
    );
}

export default Header;
