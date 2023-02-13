import { useState } from "react";
import { CouponModel } from "../../../Models/CouponModel";
import notFoundImage from "../../..//Assets/not-found.jpg";
import "./PurchaseCard.css";
import { FaShekelSign } from "react-icons/fa";
import { NumericKeys } from "react-hook-form/dist/types/path/common";
interface PurchaseProps {
	purchase: CouponModel;
	customerId: number;
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
					<p>Description: {props.purchase.description}</p>
					<p>Category: {props.purchase.category}</p>
					<p>Ends in: {props.purchase.endDate}</p>
					<p><span>Cost: {props.purchase.price}<FaShekelSign /></span></p>
				</div>
				<div>
					{
						imageError ?
							<img src={notFoundImage} alt={props.purchase.title} />
							:
							<img src={imageUrl} alt={props.purchase.title} onError={handleImageError} />
					}
				</div>
			</div>
        </div>
    );
}

export default PurchaseCard;
