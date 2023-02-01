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
    const [companies, setCompanies] = useState<CompanyModel[]>(store.getState().companiesReducer.companies);
    useEffect(() => {
        // const token = store.getState().userReducer.user.token;
        // console.log(token);
        // if (!token) {
        //     navigate("/login");
        // }
        
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
        return store.subscribe(() => {
            setCompanies(store.getState().companiesReducer.companies); // Will let us notify
        });
    }, []);


    return (
        <div className="CompanyList">
			{
                companies?.length > 0
                    ? <>{companies.map((company, idx) => <CompanyCard key={"c" + idx} />)}</>
                    : <Page404 />
            }
        </div>
    );
}

export default CompanyList;
