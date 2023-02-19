import { useState, useEffect } from "react";
import { FaRegPlusSquare, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { User } from "../../../../Models/Auth";
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
    const [user, setUser] = useState<User>(store.getState().userReducer.user);
    const [companies, setCompanies] = useState<CompanyModel[]>([]);
    useEffect(() => {
        const unsubscribe = store.subscribe(() => {
            const currentUser = store.getState().userReducer.user;
            setUser(currentUser);
        });
        return unsubscribe;
    }, []);
    useEffect(() => {
        const token = store.getState().userReducer.user.token;
        if (!token) {
          navigate("/login");
        } else if (companies.length === 0) {
          webApi
            .getAllCompanies(token)
            .then((res) => {
              setCompanies(res.data);
              store.dispatch(gotAllCompaniesAction(res.data));
            })
            .catch((err) => notify.error(err));
        }
      }, [user.token, companies]);
      




    // useEffect(() => {
    //     const token = store.getState().userReducer.user.token;
    //     if (!token) {
    //         navigate("/login");
    //     }

    //     webApi.getAllCompanies(store.getState().userReducer.user.token)
    //         .then(res => {
    //             // Update local state
    //             setCompanies(res.data);

    //             // Update app state
    //             store.dispatch(gotAllCompaniesAction(res.data));

    //             // notify.success('Woho I got my element from server side!!!');
    //         })
    //         .catch(err => notify.error(err));

    //     return store.subscribe(() => {
    //         setCompanies(store.getState().companiesReducer.companies);
    //     });
    // }, []);

    return (
        <>
            <div className="row">
                <button className="add" onClick={() => navigate('/company/add/')}><FaRegPlusSquare />&nbsp;add a new Company</button>
            </div>
            <div className="CompanyList row">
                {companies?.length > 0
                    ? <>{companies.map((c, idx) => <CompanyCard key={"c" + idx} company={c} />)}</>
                    : <Page404 />}
            </div>
        </>
    );
}

export default CompanyList;
