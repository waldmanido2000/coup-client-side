import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { User } from "../../../Models/Auth";
import store from "../../../Redux/Store";
import { loggedOut } from "../../../Redux/UserAppState";
import "./AuthMenu.css";

function AuthMenu(): JSX.Element {
    const [user, setUser] = useState<User>(store.getState().userReducer.user);

    useEffect(() => {
        const unsubscribe = store.subscribe(() => {
            const currentUser = store.getState().userReducer.user;
            setUser(currentUser);
        });
        return unsubscribe;
    }, []);

    return (
        <div className="AuthMenu">
            {(user.token)
                ? <Link to={'logout'} >logout here</Link>
                : <Link to={'login'} >login here</Link>}
        </div>
    );
}

export default AuthMenu;
