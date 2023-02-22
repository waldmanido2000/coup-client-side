import { useState, useEffect } from "react";
import { FaRegPlusSquare, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { User } from "../../../../Models/Auth";
import { CustomerModel } from "../../../../Models/CustomerModel";
import { gotAllCustomersAction } from "../../../../Redux/CustomerAppState";
import store from "../../../../Redux/Store";
import { loggedOut } from "../../../../Redux/UserAppState";
import notify from "../../../../Services/NotificationService";
import webApi from "../../../../Services/WebApi";
import CustomerCard from "../../../Cards/CustomerCard/CustomerCard";
import Page404 from "../../../PagesArea/MainArea/Page404/Page404";
import "./CustomerList.css";

function CustomerList(): JSX.Element {
    const navigate = useNavigate();
    const [customers, setCustomers] = useState<CustomerModel[]>([]);
    const [user, setUser] = useState<User>(store.getState().userReducer.user);

    useEffect(() => {
        const token = store.getState().userReducer.user.token;
        if (!token) {
            navigate("/login");
        }
    
        webApi.getAllCustomers(store.getState().userReducer.user.token)
            .then(res => {
                // Update local state
                setCustomers(res.data);
    
                // Update app state
                store.dispatch(gotAllCustomersAction(res.data));
    
                // notify.success('Woho I got my element from server side!!!');
            })
            .catch(err => {
                if (err.response && err.response.status === 401) {
                    store.dispatch(loggedOut());
                }
                notify.error(err);
            });
    
        return store.subscribe(() => {
            setCustomers(store.getState().customersReducer.customers);
        });
    }, [user.token, customers]);
    


    return (
        <>
            <div className="row">
                <button className="add" onClick={() => navigate('/customer/add/')}><FaRegPlusSquare />&nbsp;add a new Customer</button>
            </div>
            <div className="CustomerList row">
                {customers?.length > 0
                    ? <>{customers.map((c, idx) => <CustomerCard key={"c" + idx} customer={c} />)}</>
                    : <Page404 />}
            </div>
        </>
    );
}

export default CustomerList;
