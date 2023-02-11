import { useState } from "react";
import CompanyList from "../CompanyList/CompanyList";
import CustomerList from "../CustomerList/CustomerList";
import "./AdminScreen.css";

function AdminScreen(): JSX.Element {
    const [viewCompanies, setViewCompanies] = useState<boolean>(true);

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
