import { useState, useEffect } from "react";
import { CustomerModel } from "../../../../Models/CustomerModel";
import notify from "../../../../Services/NotificationService";
import webApi from "../../../../Services/WebApi";
import PurchaseList from "../PurchaseList/PurchaseList";
import "./CustomerDetails.css";
interface CustomerDetailsProps {
    customerId: number;
}
function CustomerDetails(props: CustomerDetailsProps): JSX.Element {
    const [customer, setCustomer] = useState<CustomerModel>();
    useEffect(() => {
        // const token = store.getState().userReducer.user.token;
        // if (!token) {
        //     navigate("/login");
        // }

        webApi.getCustomerDetails(props.customerId)
            .then(res => {
                // Update local state
                setCustomer(res.data);
                console.log(res.data);

                // notify.success('Woho I got my element from server side!!!');
            })
            .catch(err => notify.error(err));
    }, []);
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
