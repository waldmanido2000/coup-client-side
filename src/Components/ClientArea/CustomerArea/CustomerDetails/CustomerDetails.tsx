import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../../../../Models/Auth";
import { CustomerModel } from "../../../../Models/CustomerModel";
import store from "../../../../Redux/Store";
import { loggedOut } from "../../../../Redux/UserAppState";
import notify from "../../../../Services/NotificationService";
import webApi from "../../../../Services/WebApi";
import PurchaseList from "../PurchaseList/PurchaseList";
import "./CustomerDetails.css";
interface CustomerDetailsProps {
    customerId: number;
}
function CustomerDetails(props: CustomerDetailsProps): JSX.Element {
    const navigate = useNavigate();
    const [customer, setCustomer] = useState<CustomerModel>();
    const [user, setUser] = useState<User>(store.getState().userReducer.user);

    useEffect(() => {
        const token = store.getState().userReducer.user.token;
        const id = store.getState().userReducer.user.id;
        if (!token) {
            navigate("/login");
        }
    
        webApi.getCustomerDetails(id, store.getState().userReducer.user.token)
            .then(res => {
                // Update local state
                setCustomer(res.data);
                console.log(res.data);
            })
            .catch(err => {
                if (err.response && err.response.status === 401) {
                    store.dispatch(loggedOut());
                    navigate("/login");
                } else {
                    notify.error(err);
                }
            });
    }, [user.token]);
    
    return (
        <div className="CustomerDetails">
            <h3>Hello {customer?.firstName} {customer?.lastName}!</h3>
            <p>Your email is: {customer?.email}</p>
            <h3>Your available coupons are:</h3>
            <PurchaseList customerId={props.customerId} />
        </div>
    );
}

export default CustomerDetails;
