import { useState } from "react";
import { CouponModel } from "../../../Models/CouponModel";
import notFoundImage from "../../..//Assets/not-found.jpg";
import "./PurchaseCard.css";
import { FaCar, FaHamburger, FaLightbulb, FaPlane, FaShekelSign, FaShoppingBag, FaUtensils } from "react-icons/fa";
interface PurchaseProps {
	purchase: CouponModel;
	customerId: number;
}

function PurchaseCard(props: PurchaseProps): JSX.Element {
	const [imageUrl, setImageUrl] = useState(props.purchase.image);
	const [imageError, setImageError] = useState(false);

	const handleImageError = () => {
		setImageError(true);
	};
	const categoryClass = (category: string) => {
		switch (category.toLowerCase()) {
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
	const getCategoryIcon = (category: string) => {
		switch (category.toLowerCase()) {
			case "cars":
				return <FaCar />;
			case "restaurant":
				return <FaHamburger />;
			case "food":
				return <FaUtensils />;
			case "electricity":
				return <FaLightbulb />;
			case "vacation":
				return <FaPlane />;
			case "clothes":
				return <FaShoppingBag />;
			default:
				return "";
		}
	};
	return (
		<div className={`PurchaseCard ${categoryClass(props.purchase.category)}`}>
			<div className="row couponCardButtons">
				<h4>{props.purchase.title}</h4>
				<div className="category">
					<label>{categoryClass(props.purchase.category)}</label>
					{getCategoryIcon(props.purchase.category)}
				</div>
			</div>
			<div className="row couponDetails">
				<div>
					<p>Description: {props.purchase.description}</p>
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
