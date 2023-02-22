import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deletedCouponAction } from "../../../../Redux/CouponAppState";
import store from "../../../../Redux/Store";
import { loggedOut } from "../../../../Redux/UserAppState";
import notify from "../../../../Services/NotificationService";
import webApi from "../../../../Services/WebApi";
import "./DeleteCoupon.css";

function DeleteCoupon(): JSX.Element {
    const params = useParams();
    const id = +(params.id || 0);
    const companyId = +(params.companyId || 0);
    const couponTitle = store.getState().couponsReducer.coupons.filter(c => c.id === id)[0].title.toUpperCase();
    const navigate = useNavigate();
    const abort = () => {
        navigate("/");
    }
    useEffect(() => {
        const token = store.getState().userReducer.user.token;
        if (!token) {
            navigate("/login");
        }
    }, []);
    const proceed = async () => {
        await webApi.deleteCompanyCoupon(companyId, id, store.getState().userReducer.user.token)
            .then(res => {
                notify.success('Woho deleted successfully');
                store.dispatch(deletedCouponAction(id));
                navigate("/");
            })
            .catch(err => {
                if (err.response.status === 401) {
                    store.dispatch(loggedOut());
                    navigate("/login");
                } else {
                    notify.error(err);
                }
            });
    }
    
    return (
        <div className="DeleteCoupon">
            <h3>Attention</h3>
            <div className="col">
                <div>
                    <p>pressing on proceed will delete coupon <b>{couponTitle}</b> permanently</p>
                </div>
                <div className="buttons">
                    <p className="add" onClick={abort}>no, abort!</p>
                    <p className="add" onClick={proceed}>proceed</p>
                </div>
            </div>
        </div>
    );
}

export default DeleteCoupon;
