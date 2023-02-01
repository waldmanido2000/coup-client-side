import { CouponModel } from "../../../Models/CouponModel";
import "./CouponCard.css";

interface CouponProps {
    coupon: CouponModel;
}

function CouponCard(props:CouponProps): JSX.Element {
    return (
        <div className="CouponCard box">
			<h4>{props.coupon.title}</h4>
			<p>{props.coupon.description}</p>
			<p>{props.coupon.category}</p>
			<p>{props.coupon.startDate}</p>
			<p>{props.coupon.endDate}</p>
			<p>{props.coupon.price}</p>
			<p>{props.coupon.amount}</p>
        </div>
    );
}

export default CouponCard;
