import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import store from "../../../../Redux/Store";
import CompanyList from "../CompanyList/CompanyList";
import CustomerList from "../CustomerList/CustomerList";
import "./AdminScreen.css";

function AdminScreen(): JSX.Element {
    const [viewCompanies, setViewCompanies] = useState<boolean>(true);
    const navigate = useNavigate();
    useEffect(() => {
        const token = store.getState().userReducer.user.token;
        if (!token) {
            navigate("/login");
        }
    }, []);
    return (
        <div className="AdminScreen">
            <p onClick={() => {
                setViewCompanies(!viewCompanies);
            }}>
                <div className="adminEntities">
                    <>{viewCompanies ? "switch to customers" : "switch to companies"}</>
                </div>
            </p>
            <>{viewCompanies ? <CompanyList /> : <CustomerList />}</>
        </div>
    );
}

export default AdminScreen;
