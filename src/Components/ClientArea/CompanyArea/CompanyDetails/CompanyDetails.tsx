import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../../../../Models/Auth";
import { CompanyModel } from "../../../../Models/CompanyModel";
import store from "../../../../Redux/Store";
import { loggedOut } from "../../../../Redux/UserAppState";
import notify from "../../../../Services/NotificationService";
import webApi from "../../../../Services/WebApi";
import CouponList from "../CouponList/CouponList";
import "./CompanyDetails.css";

interface CompanyDetailsProps {
    companyId: number;
}

function CompanyDetails(props: CompanyDetailsProps): JSX.Element {
    const navigate = useNavigate();
    const [company, setCompany] = useState<CompanyModel>();
    const [user, setUser] = useState<User>(store.getState().userReducer.user);

    useEffect(() => {
        const token = store.getState().userReducer.user.token;
        const id = store.getState().userReducer.user.id;
        if (!token) {
            navigate("/login");
        }
    
        webApi.getCompanyDetails(id, store.getState().userReducer.user.token)
            .then(res => {
                // Update local state
                setCompany(res.data);
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
        <div className="CompanyDetails">
            <h3>Hello {company?.name} owner!</h3>
            <p>Your email is: {company?.email}</p>
            <h3>Your Company's Coupons list:</h3>
            <CouponList companyId={props.companyId} />
        </div>
    );
}

export default CompanyDetails;
