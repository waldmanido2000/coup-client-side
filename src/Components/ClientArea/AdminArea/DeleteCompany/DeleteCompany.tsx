import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { deletedCompanyAction } from "../../../../Redux/CompanyAppState";
import store from "../../../../Redux/Store";
import notify from "../../../../Services/NotificationService";
import webApi from "../../../../Services/WebApi";
import SingleCompany from "../SingleCompany/SingleCompany";


function DeleteTodo(): JSX.Element {
    const params = useParams();
    const id = +(params.id || 0);
    const companyName = store.getState().companiesReducer.companies.filter(c => c.id === id)[0].name.toUpperCase();
    const navigate = useNavigate();

    const abort = () => {
        navigate("/companies");
    }

    const proceed = async () => {
        await webApi.deleteCompany(id)
            .then(res => {
                notify.success('Woho deleted successfully');
                store.dispatch(deletedCompanyAction(id));
                navigate("/companies");
            })
            .catch(err => {
                notify.error(err);
            });
    }
    return (
        <div className="DeleteCompany col">
            <h3>Attention</h3>
            <div className="col">
                <div>
                    <p>pressing on proceed will delete company <b>{companyName}</b> permanently</p>
                </div>
                <div className="buttons">
                    <button onClick={abort}>no, abort!</button>
                    <button onClick={proceed}>proceed</button>
                </div>
            </div>
        </div>
    );
}

export default DeleteTodo;