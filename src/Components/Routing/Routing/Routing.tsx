import { Routes, Route } from "react-router-dom";
import App from "../../../App";
import Login from "../../AuthArea/Login/Login";
import Logout from "../../AuthArea/Logout/Logout";
import CompanyList from "../../ClientArea/AdminArea/CompanyList/CompanyList";
import About from "../../PagesArea/MainArea/About/About";
import Home from "../../PagesArea/MainArea/Home/Home";
import Page404 from "../../PagesArea/MainArea/Page404/Page404";
import "./Routing.css";

function Routing(): JSX.Element {
    return (
        <div className="Routing">
            <Routes>
                <Route path="/" element={<App />} />
                <Route index element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/companies" element={<CompanyList />} />
                <Route path="*" element={<Page404 />} />
            </Routes>
        </div>
    );
}

export default Routing;
