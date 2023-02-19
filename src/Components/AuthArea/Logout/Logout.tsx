import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import store from "../../../Redux/Store";
import { loggedOut } from "../../../Redux/UserAppState";
import "./Logout.css";

function Logout(): JSX.Element {
    const navigate = useNavigate();
    useEffect(() => {
        store.dispatch(loggedOut());
        // store.dispatch(removeTasks());
        navigate('/login');
    }, []);
    return (
        <></>
    );
}

export default Logout;
