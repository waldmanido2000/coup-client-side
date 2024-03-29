import { useParams, useNavigate } from "react-router-dom";
import { deletedCustomerAction } from "../../../../Redux/CustomerAppState";
import store from "../../../../Redux/Store";
import { loggedOut } from "../../../../Redux/UserAppState";
import notify from "../../../../Services/NotificationService";
import webApi from "../../../../Services/WebApi";
import "./DeleteCustomer.css";

function DeleteCustomer(): JSX.Element {
    const params = useParams();
    const id = +(params.id || 0);
    const firstName = store.getState().customersReducer.customers.filter(c => c.id === id)[0].firstName.toUpperCase();
    const lastName = store.getState().customersReducer.customers.filter(c => c.id === id)[0].lastName.toUpperCase();
    const customerName = firstName+" "+lastName;
    const navigate = useNavigate();

    const abort = () => {
        navigate("/");
    }
    const token = store.getState().userReducer.user.token;
    if (!token) {
        navigate("/login");
    }

    const proceed = async () => {
        await webApi.deleteCustomer(id, store.getState().userReducer.user.token)
        .then(res => {
        notify.success('Woho deleted successfully');
        store.dispatch(deletedCustomerAction(id));
        navigate("/");
        })
        .catch(err => {
        if (err.response && err.response.status === 401) {
        store.dispatch(loggedOut());
        navigate("/login");
        } else {
        notify.error(err);
        }
        });
        }
    return (
        <div className="DeleteCustomer col">
            <h3>Attention</h3>
            <div className="col">
                <div>
                    <p>pressing on proceed will delete customer <b>{customerName}</b> permanently</p>
                </div>
                <div className="buttons">
                    <p className="add" onClick={abort}>no, abort!</p>
                    <p className="add" onClick={proceed}>proceed</p>
                </div>
            </div>
        </div>
    );
}

export default DeleteCustomer;
