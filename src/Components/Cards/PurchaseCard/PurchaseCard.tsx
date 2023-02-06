import { CouponModel } from "../../../Models/CouponModel";
import "./PurchaseCard.css";
interface PurchaseProps {
	purchase: CouponModel;
}

function PurchaseCard(props:PurchaseProps): JSX.Element {
    return (
        <div className="PurchaseCard">
						<h4>{props.purchase.title}</h4>
			<div className="row">
				<div>
					<p>description: {props.purchase.description}</p>
					<p>category: {props.purchase.category}</p>
					<p>available since: {props.purchase.startDate}</p>
					<p>ends in: {props.purchase.endDate}</p>
					<p>cost: {props.purchase.price}</p>
				</div>
				<div>
					<img src={props.purchase.image} alt={props.purchase.image} />
				</div>
			</div>
        </div>
    );
}

export default PurchaseCard;
