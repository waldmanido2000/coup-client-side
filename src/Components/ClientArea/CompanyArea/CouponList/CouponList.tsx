import { useState, useEffect } from "react";
import { FaRegPlusSquare } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { CouponModel } from "../../../../Models/CouponModel";
import { gotAllCouponsAction } from "../../../../Redux/CouponAppState";
import store from "../../../../Redux/Store";
import notify from "../../../../Services/NotificationService";
import webApi from "../../../../Services/WebApi";
import CouponCard from "../../../Cards/CouponCard/CouponCard";
import Page404 from "../../../PagesArea/MainArea/Page404/Page404";
import "./CouponList.css";

function CouponList(): JSX.Element {
    const navigate = useNavigate();
    const companyId = 1; //tbd
    const [coupons, setCoupons] = useState<CouponModel[]>([]);
    useEffect(() => {
        // const token = store.getState().userReducer.user.token;
        // if (!token) {
        //     navigate("/login");
        // }

        webApi.getAllCompanyCoupons(companyId)
            .then(res => {
                // Update local state
                setCoupons(res.data);

                // Update app state
                store.dispatch(gotAllCouponsAction(res.data));

                // notify.success('Woho I got my element from server side!!!');
            })
            .catch(err => notify.error(err));

        return store.subscribe(() => {
            setCoupons(store.getState().couponsReducer.coupons);
        });
    }, []);
    return (
        <>
            <div className="row">
                <button className="cardButton" onClick={() => navigate('/company-coupon/add/')}><FaRegPlusSquare />&nbsp;add a new Coupon</button>
            </div>
            <div className="CouponList row">
                {coupons?.length > 0
                    ? <>{coupons.map((c, idx) => <CouponCard key={"c" + idx} coupon={c} />)}</>
                    : <Page404 />}
            </div>
        </>
    );
}

export default CouponList;
