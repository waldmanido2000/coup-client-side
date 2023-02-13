import { useEffect, useState } from "react";
import { CompanyModel } from "../../../../Models/CompanyModel";
import notify from "../../../../Services/NotificationService";
import webApi from "../../../../Services/WebApi";
import CouponList from "../CouponList/CouponList";
import "./CompanyDetails.css";

interface CompanyDetailsProps {
    companyId: number;
}

function CompanyDetails(props: CompanyDetailsProps): JSX.Element {
    const [company, setCompany] = useState<CompanyModel>();
    useEffect(() => {
        // const token = store.getState().userReducer.user.token;
        // if (!token) {
        //     navigate("/login");
        // }

        webApi.getCompanyDetails(props.companyId)
            .then(res => {
                // Update local state
                setCompany(res.data);
                console.log(res.data);

                // notify.success('Woho I got my element from server side!!!');
            })
            .catch(err => notify.error(err));
    }, []);
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
