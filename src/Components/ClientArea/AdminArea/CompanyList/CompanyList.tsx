import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CompanyModel } from "../../../../Models/CompanyModel";
import { gotAllCompaniesAction } from "../../../../Redux/CompanyAppState";
import store from "../../../../Redux/Store";
import notify from "../../../../Services/NotificationService";
import webApi from "../../../../Services/WebApi";
import CompanyCard from "../../../Cards/CompanyCard/CompanyCard";
import Page404 from "../../../PagesArea/MainArea/Page404/Page404";
import "./CompanyList.css";

function CompanyList(): JSX.Element {
    const navigate = useNavigate();
    const [companies, setCompanies] = useState<CompanyModel[]>([]);
    useEffect(() => {
        // const token = store.getState().userReducer.user.token;
        // if (!token) {
        //     navigate("/login");
        // }

        webApi.getAllCompanies()
            .then(res => {
                // Update local state
                setCompanies(res.data);

                // Update app state
                store.dispatch(gotAllCompaniesAction(res.data));

                // notify.success('Woho I got my element from server side!!!');
            })
            .catch(err => notify.error(err));

        return store.subscribe(() => {
            setCompanies(store.getState().companiesReducer.companies);
        });
    }, []);

    return (
        <div className="CompanyList col">
			{
                companies?.length > 0
                    ? <>{companies.map((c, idx) => <CompanyCard key={"c" + idx} company={c} />)}</>
                    : <Page404 />
            }
        </div>
    );
}

export default CompanyList;
