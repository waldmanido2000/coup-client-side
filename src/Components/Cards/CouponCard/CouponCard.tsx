import { CouponModel } from "../../../Models/CouponModel";
import "./CouponCard.css";

interface CouponProps {
    coupon: CouponModel;
}

function CouponCard(props:CouponProps): JSX.Element {
    return (
        <div className="CouponCard row">
			<h4>{props.coupon.title}</h4>
			<h4>{props.coupon.title}</h4>
			<h4>{props.coupon.title}</h4>
			<h4>{props.coupon.title}</h4>
			<h4>{props.coupon.title}</h4>
        </div>
    );
}

export default CouponCard;
