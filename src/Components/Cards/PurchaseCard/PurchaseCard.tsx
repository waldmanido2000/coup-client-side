import { useState } from "react";
import { CouponModel } from "../../../Models/CouponModel";
import notFoundImage from "../../..//Assets/not-found.jpg";
import "./PurchaseCard.css";
interface PurchaseProps {
	purchase: CouponModel;
}

function PurchaseCard(props:PurchaseProps): JSX.Element {
	const [imageUrl, setImageUrl] = useState(props.purchase.image);
	const [imageError, setImageError] = useState(false);

	const handleImageError = () => {
		setImageError(true);
	};
	const categoryClass = (category: string) => {
		switch ( category.toLowerCase()) {
			case "cars":
				return "car";
			case "restaurant":
				return "restaurant";
			case "food":
				return "food";
			case "electricity":
				return "electricity";
			case "vacation":
				return "vacation";
			case "clothes":
				return "clothes";
			default:
				return "";
		}
	};
    return (
		<div className={`PurchaseCard ${categoryClass(props.purchase.category)}`}>
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
					{
						imageError ?
							<img src={notFoundImage} alt={props.purchase.image} />
							:
							<img src={imageUrl} alt={props.purchase.image} onError={handleImageError} />
					}
				</div>
			</div>
        </div>
    );
}

export default PurchaseCard;
