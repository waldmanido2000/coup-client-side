import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CompanyModel } from "../../../../Models/CompanyModel";
import { gotAllCompaniesAction } from "../../../../Redux/CompanyAppState";
import store from "../../../../Redux/Store";
import notify from "../../../../Services/NotificationService";
import webApi from "../../../../Services/WebApi";
import "./SingleCompany.css";

interface CompanyProps {
    id: number;
}

function SingleCompany(props:CompanyProps): JSX.Element {
    const navigate = useNavigate();
    const [companies, setCompanies] = useState<CompanyModel[]>(store.getState().companiesReducer.companies);
    const thisCompany = store.getState().companiesReducer.companies.find(c => c.id === props.id);
    const emptyCompany = { id: 0, name: "", email: "", password: "", coupons:[] };
    const [company, setCompany] = useState<CompanyModel>(thisCompany !== undefined ? thisCompany : emptyCompany);

    useEffect(() => {
        if (companies.length === 0) {
            webApi.getAllCompanies()
                .then(res => {
                    console.log(res.data);
                    // Update local state
                    setCompanies(res.data);

                    // Update app state

                    store.dispatch(gotAllCompaniesAction(res.data));

                    notify.success('Woho I got my element from server side!!!')

                })
                .catch(err => notify.error(err));

    }
        // if (company.id === 0) {
        //     navigate("/companies");
        // }
    }, [company.id, navigate]);

    return (
        <div className="SingleCompany">
            {
                company.id !== 0 && <div>{company.name}</div>
            }

        </div>
    );
}

export default SingleCompany;
