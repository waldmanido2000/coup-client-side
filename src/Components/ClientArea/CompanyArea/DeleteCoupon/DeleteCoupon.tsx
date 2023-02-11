import { useNavigate, useParams } from "react-router-dom";
import { deletedCouponAction } from "../../../../Redux/CouponAppState";
import store from "../../../../Redux/Store";
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
        navigate("/company-coupons");
    }

    const proceed = async () => {
        await webApi.deleteCompanyCoupon(companyId, id)
            .then(res => {
                notify.success('Woho deleted successfully');
                store.dispatch(deletedCouponAction(id));
                navigate("/company-coupons");
            })
            .catch(err => {
                notify.error(err);
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
                    <button onClick={abort}>no, abort!</button>
                    <button onClick={proceed}>proceed</button>
                </div>
            </div>
        </div>
    );
}

export default DeleteCoupon;
